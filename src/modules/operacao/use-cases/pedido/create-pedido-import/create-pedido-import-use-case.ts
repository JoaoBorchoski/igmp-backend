import { inject, injectable } from "tsyringe"
import { Pedido } from "@modules/operacao/infra/typeorm/entities/pedido"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { AppError } from "@shared/errors/app-error"
import { getConnection, QueryRunner } from "typeorm"
import { HttpResponse, noContent, ok, serverError } from "@shared/helpers"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"
import { IUserRepository } from "@modules/security/repositories/i-user-repository"
import { IUserGroupRepository } from "@modules/security/repositories/i-user-group-repository"
import { IUserProfileRepository } from "@modules/security/repositories/i-user-profile-repository"
import { IProfileRepository } from "@modules/security/repositories/i-profile-repository"
import { IClienteRepository } from "@modules/configuracao/repositories/i-cliente-repository"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { IPacoteItemRepository } from "@modules/operacao/repositories/i-pacote-item-repository"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import QRCode from "qrcode"
import puppeteer from "puppeteer"
import fs from "fs"

interface IRequest {
	pedido: any
	itens: any
	itemsCriadosReq: any
}

@injectable()
class CreatePedidoImportUseCase {
	constructor(
		@inject("PedidoRepository")
		private pedidoRepository: IPedidoRepository,
		@inject("UserRepository")
		private userRepository: IUserRepository,
		@inject("UserGroupRepository")
		private userGroupRepository: IUserGroupRepository,
		@inject("UserProfileRepository")
		private userProfileRepository: IUserProfileRepository,
		@inject("ProfileRepository")
		private profileRepository: IProfileRepository,
		@inject("ProdutoRepository")
		private produtoRepository: IProdutoRepository,
		@inject("PedidoItemRepository")
		private pedidoItemRepository: IPedidoItemRepository,
		@inject("ClienteRepository")
		private clienteRepository: IClienteRepository,
		@inject("PacoteRepository")
		private pacoteRepository: IPacoteRepository,
		@inject("PacoteItemRepository")
		private pacoteItemRepository: IPacoteItemRepository
	) {}

	async execute({ pedido, itens, itemsCriadosReq }: IRequest): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		console.log("pedido", pedido)
		console.log("itens", itens)
		console.log("itemsCriadosReq", itemsCriadosReq)

		let browser
		try {
			const itensKit: any[] = []
			const itemsCriados: any[] = []
			const pacotesCriados: any[] = []

			const {
				data: { id, nome },
			} = await this.clienteRepository.get(pedido.cliente)

			if (!id) {
				throw new AppError("Cliente não encontrado")
			}

			const newPedido = await this.pedidoRepository.createWithQueryRunner(
				{
					descricao: pedido.descricao,
					cliente: id,
					dataEmissao: new Date(pedido.dataEmissao),
				},
				queryRunner.manager
			)

			for await (const item of itens) {
				let produtoId = await this.produtoRepository.findByNameWithQueryRunner(
					item.produtoDescricao.split(" - ")[0],
					queryRunner.manager
				)

				let prod = produtoId.data

				if (!prod) {
					const newProduto = await this.produtoRepository.createWithQueryRunner(
						{
							nome: item.produtoDescricao.split(" - ")[0],
							descricao: item.produtoDescricao.split(" - ")[1],
							tipo: 0,
						},
						queryRunner.manager
					)

					prod = newProduto.data
				}

				const newPedidoItem = await this.pedidoItemRepository.createWithQueryRunner(
					{
						pedidoId: newPedido.data.id,
						produto: prod.id ? prod.id : prod.data.id,
						quantidade: item.quantidade,
						kit: item.kit,
					},
					queryRunner.manager
				)

				if (item.kit) {
					itensKit.push(newPedidoItem)
				}
			}

			// Mapa para rastrear quantos itens já foram processados para cada produto
			const produtosProcessados = new Map<string, number>()

			for await (const item of itensKit) {
				const produto = await this.produtoRepository.getWithQueryRunner(item.data.produto, queryRunner.manager)

				// Filtrar itemsCriadosReq para este produto específico
				const itensProduto = itemsCriadosReq.filter((itemReq) => itemReq.produto === produto.data.nomeCompleto)

				// Obter o índice inicial para este produto
				let indiceProduto = produtosProcessados.get(produto.data.nomeCompleto) || 0

				for (let i = 0; i < item.data.quantidade; i++) {
					// Pegar o item correspondente na ordem correta usando o índice
					const teste = itensProduto[indiceProduto]

					if (!teste) {
						throw new AppError(
							`Item não encontrado para produto ${produto.data.nomeCompleto} na posição ${indiceProduto}`
						)
					}

					const pacote = await this.pacoteRepository.createWithQueryRunner(
						{
							pedidoId: newPedido.data.id,
							descricao: `Pacote ${teste.produto} - ${newPedido.data.descricao} - Unidade ${teste.unidade}`,
						},
						queryRunner.manager
					)

					await this.pacoteItemRepository.createWithQueryRunner(
						{
							pacoteId: pacote.data.id,
							produto: item.data.produto,
							quantidade: 1,
						},
						queryRunner.manager
					)

					itemsCriados.push({
						produto: teste.produto,
						quantidade: 1,
						pacoteId: teste.pacoteId,
						unidade: teste.unidade,
						quantidadeTotal: teste.quantidadeTotal,
						torre: teste.torre,
						andar: teste.andar,
						apto: teste.apto,
						ambiente: teste.ambiente,
					})

					pacotesCriados.push(pacote.data)

					// Incrementar o índice para o próximo item deste produto
					indiceProduto++
				}

				// Atualizar o mapa com o índice atualizado para este produto
				produtosProcessados.set(produto.data.nomeCompleto, indiceProduto)
			}

			try {
				browser = await puppeteer.launch({
					headless: true,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
			} catch (browserError) {
				console.error("Erro ao iniciar o browser:", browserError)
				throw new AppError("Erro ao gerar PDF: Browser não pôde ser iniciado")
			}

			let qrCodeColor = ""

			const colors = await this.pacoteRepository.getPacoteColor()

			if (colors.data[0].description.clientes[newPedido.data.clienteDocumento]) {
				qrCodeColor = colors.data[0].description.clientes[newPedido.data.clienteDocumento]
			} else {
				qrCodeColor = "#0088ffff"
			}

			const todasEtiquetas: any[] = []
			for (const item of itemsCriados) {
				// Cada item já representa uma unidade individual, então criar uma etiqueta para cada
				const qrCodeDados: any = {
					pedidoId: newPedido.data.id,
					descricao: newPedido.data.descricao,
					pacoteId: item.pacoteId,
					kit: true,
					etiquetaNumero: item.unidade,
					etiquetaTotal: item.quantidadeTotal, // Usar a quantidade total original do produto
					produto: item.produto,
				}

				const qrCodeDadosStringify = JSON.stringify(qrCodeDados)

				// Gerar QR code único para cada etiqueta
				const qrcode = await QRCode.toDataURL(qrCodeDadosStringify, {
					color: {
						dark: "#000000",
						light: "#00000000",
					},
				})

				todasEtiquetas.push({
					produto: item.produto,
					numero: item.unidade,
					total: item.quantidadeTotal, // Usar a quantidade total original do produto
					qrcode: qrcode,
					torre: item.torre,
					andar: item.andar,
					apto: item.apto,
					ambiente: item.ambiente,
				})
			}

			const etiquetasPorPagina = 8
			const paginas: any[][] = []

			for (let i = 0; i < todasEtiquetas.length; i += etiquetasPorPagina) {
				const paginaEtiquetas = todasEtiquetas.slice(i, i + etiquetasPorPagina)
				paginas.push(paginaEtiquetas)
			}

			// Gerar HTML para cada página
			let paginasHTML = ""
			let logoDataUrl = ""
			try {
				logoDataUrl = fs
					.readFileSync("/opt/projetos/igmp/backend/tmp/logo_IGMP-removebg-preview.png")
					.toString("base64")
			} catch (logoError) {
				console.warn("Logo não encontrado, continuando sem logo:", logoError)
				logoDataUrl = ""
			}

			paginas.forEach((pagina, paginaIndex) => {
				let etiquetasHTML = ""

				// Etiquetas em 2 colunas com 4 etiquetas em cada
				for (let i = 0; i < pagina.length; i++) {
					const etiqueta = pagina[i]

					console.log("-------------------------")
					console.log("etiqueta", etiqueta)

					etiquetasHTML += `
                        <div style="border: 2px solid #000; padding: 12px; text-align: left; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 15px;">
                            <div>
                               
                                <div style="margin-bottom: 6px; font-size: 11px;">
                                    <strong>Descrição:</strong> ${etiqueta.produto}
                                </div>
                                <div style="margin-bottom: 6px; font-size: 11px;">
                                    <strong>Cliente:</strong> ${nome}
                                </div>
                                <div style="margin-bottom: 6px; font-size: 11px;">
                                    <strong>Torre:</strong> ${etiqueta.torre} | <strong>Andar:</strong> ${etiqueta.andar} | <strong>Apto:</strong> ${etiqueta.apto} | <strong>Ambiente:</strong> ${etiqueta.ambiente}
                                </div>
                            </div>
                            <div style="text-align: center; margin-top: auto;">
                                <img src="${etiqueta.qrcode}" style="width: 100px; height: 100px; margin: 0 auto 5px; display: block;">
                                <div style="font-size: 10px;">
                                    Etiqueta ${etiqueta.numero} de ${etiqueta.total}
                                </div>
                            </div>
                        </div>
                    `
				}

				paginasHTML += `
                    <div class="pagina" style="page-break-after: always;">
                        <h3>${newPedido.data.descricao} - Cliente: ${nome}</h3>
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            ${etiquetasHTML}
                        </div>
                    </div>
                `
			})

			const htmlContent = `
                <html>
                    <head>
                        <title>IGMP - PACOTE</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                                text-align: center;
                            }
                            .nome {
                                color: #6495ED;
                            }
                            .pagina:last-child {
                                page-break-after: auto;
                            }
                            @media print {
                                .pagina {
                                    page-break-after: always;
                                }
                                .pagina:last-child {
                                    page-break-after: auto;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        ${paginasHTML}
                    </body>
                </html>
            `

			const page = await browser.newPage()
			await page.setContent(htmlContent)

			const pdfBuffer = await page.pdf({
				format: "A4",
				printBackground: true,
			})

			await queryRunner.commitTransaction()

			return itensKit.length > 0 ? ok(pdfBuffer) : noContent()
		} catch (error) {
			console.log("error", error)
			await queryRunner.rollbackTransaction()
			return serverError(error)
		} finally {
			if (browser) {
				try {
					await browser.close()
				} catch (browserCloseError) {
					console.error("Erro ao fechar browser:", browserCloseError)
				}
			}
			await queryRunner.release()
		}
	}
}

export { CreatePedidoImportUseCase }
