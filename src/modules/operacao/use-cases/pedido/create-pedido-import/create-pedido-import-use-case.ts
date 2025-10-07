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

            for await (const item of itensKit) {
                for (let i = 0; i < item.data.quantidade; i++) {
                    const produto = await this.produtoRepository.getWithQueryRunner(item.data.produto, queryRunner.manager)
                    const teste = itemsCriadosReq
                        .filter((item) => item.produto === produto.data.nomeCompleto)
                        .find((item) => item.unidade === i + 1)

                    const pacote = await this.pacoteRepository.createWithQueryRunner(
                        {
                            pedidoId: newPedido.data.id,
                            descricao: `Pacote ${teste.produto} - ${newPedido.data.descricao} - Unidade ${i + 1}`,
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
                }
            }

            try {
                browser = await puppeteer.launch({
                    headless: true,
                    executablePath: "/usr/bin/chromium-browser",
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

            const etiquetasPorPagina = 3
            const paginas: any[][] = []

            for (let i = 0; i < todasEtiquetas.length; i += etiquetasPorPagina) {
                const paginaEtiquetas = todasEtiquetas.slice(i, i + etiquetasPorPagina)
                paginas.push(paginaEtiquetas)
            }

            // Gerar HTML para cada página
            let paginasHTML = ""
            let logoDataUrl = ""
            try {
                logoDataUrl = fs.readFileSync("/opt/projetos/igmp/backend/tmp/logo_IGMP-removebg-preview.png").toString("base64")
            } catch (logoError) {
                console.warn("Logo não encontrado, continuando sem logo:", logoError)
                logoDataUrl = ""
            }

            paginas.forEach((pagina, paginaIndex) => {
                let etiquetasHTML = ""

                // Etiquetas em coluna única (uma em cima da outra)
                for (let i = 0; i < pagina.length; i++) {
                    const etiqueta = pagina[i]

                    etiquetasHTML += `
                        <div style="border: 2px solid #000; padding: 12px; text-align: left; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; margin: 0 auto 15px;">
                            <div>
                                ${
                                    logoDataUrl
                                        ? `
                                <div style="text-align: center; margin-bottom: 8px;">
                                    <img src="data:image/png;base64,${logoDataUrl}" style="height: 50px;">
                                </div>
                                `
                                        : ""
                                }
                                <div style="margin-bottom: 6px; font-size: 12px;">
                                    <strong>Descrição:</strong> ${etiqueta.produto}
                                </div>
                                <div style="margin-bottom: 6px; font-size: 12px;">
                                    <strong>Cliente:</strong> ${nome}
                                </div>
                                <div style="margin-bottom: 6px; font-size: 12px;">
                                    <strong>Torre:</strong> ${etiqueta.torre} | <strong>Andar:</strong> ${
                        etiqueta.andar
                    } | <strong>Apto:</strong> ${etiqueta.apto} | <strong>Ambiente:</strong> ${etiqueta.ambiente}
                                </div>
                            </div>
                            <div style="text-align: center; margin-top: auto;">
                                <img src="${
                                    etiqueta.qrcode
                                }" style="width: 150px; height: 150px; margin: 0 auto 5px; display: block;">
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
                        <div style="margin-top: 15px;"></div>
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
