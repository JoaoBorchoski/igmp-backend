import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"
import { IClienteRepository } from "@modules/configuracao/repositories/i-cliente-repository"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { IPacoteItemRepository } from "@modules/operacao/repositories/i-pacote-item-repository"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { IProfileRepository } from "@modules/security/repositories/i-profile-repository"
import { IUserGroupRepository } from "@modules/security/repositories/i-user-group-repository"
import { IUserProfileRepository } from "@modules/security/repositories/i-user-profile-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse, noContent, ok, serverError } from "@shared/helpers"
import { hash } from "bcrypt"
import fs from "fs"
import moment from "moment"
import { inject, injectable } from "tsyringe"
import { getConnection } from "typeorm"
import xlsx from "xlsx"
import QRCode from "qrcode"
import puppeteer from "puppeteer"
interface IRequest {
    file: Express.Multer.File
}

@injectable()
class ImportPedidosUseCase {
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

    async parseExcelData(row: any, queryRunner: any): Promise<any> {
        const produtoId = await this.produtoRepository.findByNameWithQueryRunner(row["Ordem de embarque"], queryRunner)

        if (!produtoId) return null

        const result = {
            produto: produtoId.data.id,
            produtoNome: produtoId.data.nome,
            quantidade: row["__EMPTY_3"] ? parseInt(row["__EMPTY_3"]) : 0,
            kit: produtoId.data.descricao.includes("KT"),
        }

        return result
    }

    private async parseExcelFile(file: Express.Multer.File): Promise<any[]> {
        return new Promise((resolve) => {
            const fileContent = fs.readFileSync(file.path)
            const workbook = xlsx.read(fileContent, { type: "buffer" })
            const sheetNames = workbook.SheetNames
            const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

            resolve(excelData)
        })
    }

    async execute(request: IRequest): Promise<HttpResponse> {
        const { file } = request
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const rows = await this.parseExcelFile(file)

            const cabecalho = {
                pedido: rows[0]["Ordem de embarque"],
                dataEmissao: moment(rows[0]["__EMPTY_5"].split(": ")[1], "DD/MM/YYYY").toDate(),
                cliente: rows[1]["Ordem de embarque"].split(": ")[1],
                rua: rows[2]["Ordem de embarque"].split(": ")[1],
                bairro: rows[2]["__EMPTY_2"].split(": ")[1],
                cidade: rows[2]["__EMPTY_5"].split(": ")[1],
            }

            const {
                data: { id, nome },
            } = await this.clienteRepository.findByName(cabecalho.cliente)

            if (!id) {
                throw new AppError("Cliente não encontrado")
            }

            const pedido = await this.pedidoRepository.createWithQueryRunner(
                {
                    descricao: cabecalho.pedido,
                    cliente: id,
                    dataEmissao: new Date(cabecalho.dataEmissao),
                },
                queryRunner.manager
            )

            const items = rows.slice(6, rows.length - 2)
            const itensKit = []
            const itemsCriados = []
            const pacotesCriados = []

            for await (const row of items) {
                let pedidoItemParse = await this.parseExcelData(row, queryRunner.manager)

                if (!pedidoItemParse) {
                    await this.produtoRepository.createWithQueryRunner(
                        {
                            nome: row["Ordem de embarque"],
                            descricao: row["__EMPTY"],
                            tipo: 0,
                        },
                        queryRunner.manager
                    )
                }

                pedidoItemParse = await this.parseExcelData(row, queryRunner.manager)

                await this.pedidoItemRepository.createWithQueryRunner(
                    {
                        pedidoId: pedido.data.id,
                        produto: pedidoItemParse.produto,
                        quantidade: pedidoItemParse.quantidade,
                        kit: pedidoItemParse.kit,
                    },
                    queryRunner.manager
                )

                if (pedidoItemParse.kit) {
                    itensKit.push(pedidoItemParse)
                }
            }

            // Criar um pacote para cada item kit individualmente
            for await (const item of itensKit) {
                // Criar um pacote para cada unidade do item kit
                for (let i = 0; i < item.quantidade; i++) {
                    const pacote = await this.pacoteRepository.createWithQueryRunner(
                        {
                            pedidoId: pedido.data.id,
                            descricao: `Pacote ${item.produtoNome} - ${pedido.data.descricao} - Unidade ${i + 1}`,
                        },
                        queryRunner.manager
                    )

                    await this.pacoteItemRepository.createWithQueryRunner(
                        {
                            pacoteId: pacote.data.id,
                            produto: item.produto,
                            quantidade: 1, // Cada pacote contém apenas 1 unidade
                        },
                        queryRunner.manager
                    )

                    const produto = await this.produtoRepository.getWithQueryRunner(item.produto, queryRunner.manager)

                    itemsCriados.push({
                        produto: produto.data.nomeCompleto,
                        quantidade: 1, // Cada item criado representa 1 unidade
                        pacoteId: pacote.data.id,
                        unidade: i + 1,
                        quantidadeTotal: item.quantidade, // Quantidade total original do produto
                    })

                    pacotesCriados.push(pacote.data)
                }
            }

            const browser = await puppeteer.launch({
                headless: true,
                executablePath: "/usr/bin/chromium-browser",
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            })

            let qrCodeColor = ""

            const colors = await this.pacoteRepository.getPacoteColor()

            if (colors.data[0].description.clientes[pedido.data.clienteDocumento]) {
                qrCodeColor = colors.data[0].description.clientes[pedido.data.clienteDocumento]
            } else {
                qrCodeColor = "#0088ffff"
            }

            // Gerar todas as etiquetas primeiro
            const todasEtiquetas = []
            for (const item of itemsCriados) {
                // Cada item já representa uma unidade individual, então criar uma etiqueta para cada
                const qrCodeDados = {
                    pedidoId: pedido.data.id,
                    descricao: pedido.data.descricao,
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
                })
            }

            // Dividir em páginas com 6 etiquetas por página (2 por linha)
            const etiquetasPorPagina = 6
            const paginas = []

            for (let i = 0; i < todasEtiquetas.length; i += etiquetasPorPagina) {
                const paginaEtiquetas = todasEtiquetas.slice(i, i + etiquetasPorPagina)
                paginas.push(paginaEtiquetas)
            }

            // Gerar HTML para cada página
            let paginasHTML = ""

            paginas.forEach((pagina, paginaIndex) => {
                let etiquetasHTML = ""

                // Dividir etiquetas em 2 colunas (3 linhas)
                for (let i = 0; i < pagina.length; i += 2) {
                    const etiqueta1 = pagina[i]
                    const etiqueta2 = pagina[i + 1]

                    etiquetasHTML += `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <div style="border: 2px solid #000; padding: 12px; text-align: left; width: 45%; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between;">
                                <div>
                                    <div style="text-align: center; margin-bottom: 8px;">
                                        <strong style="font-size: 16px; color: #6495ED;">IGMP</strong><br>
                                        <span style="font-size: 12px;">PORTAS E ESQUADRIAS</span>
                                    </div>
                                    <div style="margin-bottom: 6px; font-size: 12px;">
                                        <strong>Descrição:</strong> ${etiqueta1.produto}
                                    </div>
                                    <div style="margin-bottom: 6px; font-size: 12px;">
                                        <strong>Cliente:</strong> ${nome}
                                    </div>
                                </div>
                                <div style="text-align: center; margin-top: auto;">
                                    <img src="${
                                        etiqueta1.qrcode
                                    }" style="width: 150px; height: 150px; margin: 0 auto 5px; display: block;">
                                    <div style="font-size: 10px;">
                                        Etiqueta ${etiqueta1.numero} de ${etiqueta1.total}
                                    </div>
                                </div>
                            </div>
                            ${
                                etiqueta2
                                    ? `
                                <div style="border: 2px solid #000; padding: 12px; text-align: left; width: 45%; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <div style="text-align: center; margin-bottom: 8px;">
                                            <strong style="font-size: 16px; color: #6495ED;">IGMP</strong><br>
                                            <span style="font-size: 12px;">PORTAS E ESQUADRIAS</span>
                                        </div>
                                        <div style="margin-bottom: 6px; font-size: 12px;">
                                            <strong>Descrição:</strong> ${etiqueta2.produto}
                                        </div>
                                        <div style="margin-bottom: 6px; font-size: 12px;">
                                            <strong>Cliente:</strong> ${nome}
                                        </div>
                                    </div>
                                    <div style="text-align: center; margin-top: auto;">
                                        <img src="${etiqueta2.qrcode}" style="width: 150px; height: 150px; margin: 0 auto 5px; display: block;">
                                        <div style="font-size: 10px;">
                                            Etiqueta ${etiqueta2.numero} de ${etiqueta2.total}
                                        </div>
                                    </div>
                                </div>
                            `
                                    : '<div style="width: 45%;"></div>'
                            }
                        </div>
                    `
                }

                paginasHTML += `
                    <div class="pagina" style="page-break-after: always;">
                        <h2 class="nome">IGMP PORTAS E ESQUADRIAS LTDA/CNPJ: 47.673.906/0001-30</h2>
                        <h3>Pedido: ${pedido.data.descricao} - Cliente: ${nome}</h3>
                        <div style="margin-top: 15px;">
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

            await browser.close()

            fs.unlinkSync(file.path)
            await queryRunner.commitTransaction()
            return itensKit.length > 0 ? ok(pdfBuffer) : noContent()
        } catch (error) {
            console.log(error)
            fs.unlinkSync(file.path)
            await queryRunner.rollbackTransaction()
            return serverError(error)
        } finally {
            await queryRunner.release()
        }
    }
}

export { ImportPedidosUseCase }
