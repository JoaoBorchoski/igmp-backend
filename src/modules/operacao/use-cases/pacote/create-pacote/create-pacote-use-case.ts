import { inject, injectable } from "tsyringe"
import { Pacote } from "@modules/operacao/infra/typeorm/entities/pacote"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { createError, HttpResponse, ok, serverError } from "@shared/helpers"
import { getConnection } from "typeorm"
import { IPacoteItemRepository } from "@modules/operacao/repositories/i-pacote-item-repository"
import { IPedidoItemRepository } from "@modules/operacao/repositories/i-pedido-item-repository"
import { AppError } from "@shared/errors/app-error"
import puppeteer from "puppeteer"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import QRCode from "qrcode"

interface IRequest {
    pedidoId: string
    descricao: string
    pacoteItems: any[]
}

@injectable()
class CreatePacoteUseCase {
    constructor(
        @inject("PacoteRepository")
        private pacoteRepository: IPacoteRepository,
        @inject("PacoteItemRepository")
        private pacoteItemRepository: IPacoteItemRepository,
        @inject("PedidoItemRepository")
        private pedidoItemRepository: IPedidoItemRepository,
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository,
        @inject("PedidoRepository")
        private pedidoRepository: IPedidoRepository
    ) {}

    async execute({ pedidoId, descricao, pacoteItems }: IRequest): Promise<HttpResponse> {
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const pedido = await this.pedidoRepository.get(pedidoId)
            const numPacotes = await this.pacoteRepository.getNumeroPacotesByPedidoId(pedidoId)

            const itemsComQuantidadeExedida = []
            const itemsCriados = []
            const result = await this.pacoteRepository.createWithQueryRunner(
                {
                    pedidoId,
                    descricao,
                },
                queryRunner.manager
            )

            if (!!pedidoId) {
                for await (const item of pacoteItems) {
                    const quantidade = await this.pacoteItemRepository.getQuantidadeByPedidoIdAndProdutoId(
                        pedidoId,
                        item.produtoId
                    )
                    const pedidoItem = await this.pedidoItemRepository.getByPedidoIdAndProduto(pedidoId, item.produtoId)

                    if (+item.quantidade + +quantidade.data.quantidadeUsada > +pedidoItem.data.quantidade) {
                        itemsComQuantidadeExedida.push({
                            produto: item.produto,
                            quantidade: item.quantidade,
                            quantidadeUsada: quantidade.data.quantidadeUsada,
                            quantidadeDisponivel: pedidoItem.data.quantidade - quantidade.data.quantidadeUsada,
                        })
                        continue
                    }

                    const pacoteItem = await this.pacoteItemRepository.createWithQueryRunner(
                        {
                            pacoteId: result.data.id,
                            produto: item.produtoId,
                            quantidade: item.quantidade,
                        },
                        queryRunner.manager
                    )

                    const produtoCriado = await this.produtoRepository.get(item.produtoId)

                    itemsCriados.push({
                        produto: produtoCriado.data.nomeCompleto,
                        quantidade: pacoteItem.data.quantidade,
                    })
                }
            } else {
                for await (const item of pacoteItems) {
                    const produto = await this.produtoRepository.get(item.produtoId)

                    const pacoteItem = await this.pacoteItemRepository.createWithQueryRunner(
                        {
                            pacoteId: result.data.id,
                            produto: item.produtoId,
                            quantidade: item.quantidade,
                        },
                        queryRunner.manager
                    )

                    itemsCriados.push({
                        produto: produto.data.nomeCompleto,
                        quantidade: pacoteItem.data.quantidade,
                    })
                }
            }

            if (itemsComQuantidadeExedida.length > 0) {
                await queryRunner.rollbackTransaction()
                const message = itemsComQuantidadeExedida
                    .map((item) => {
                        return `Produto: ${item.produto}, Quantidade Requerida: ${item.quantidade}, Quantidade Usada: ${item.quantidadeUsada}, Quantidade Disponível: ${item.quantidadeDisponivel}`
                    })
                    .join("   ---   ")
                return createError(410, `Quantidade excedida para os seguintes itens: ${message}`)
            }

            const qrCodeDados = {
                pacoteId: result.data.id,
                pedidoId: pedido?.data?.id ?? null,
                descricao: result.data.descricao,
            }

            const qrCodeDadosStringify = JSON.stringify(qrCodeDados)

            const qrcode = await QRCode.toDataURL(qrCodeDadosStringify, {
                color: {
                    dark: "#000000",
                    light: "#00000000",
                },
            })

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
                            ul {
                                padding-left: 0;
                                list-style: none;
                            }
                            li {
                                margin-bottom: 8px;
                                font-size: 16px;
                            }
                        </style>
                    </head>
                    <body>
                        <div>
                            <h3 class="nome">IGMP PORTAS E ESQUADRIAS LTDA/CNPJ: 47.673.906/0001-30</h3>
                            <ul>
                                ${itemsCriados
                                    .map((item) => {
                                        return `<li>${item.produto} = ${item.quantidade} PÇS</li>`
                                    })
                                    .join("")}
                            </ul>
                            <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 300px;">
                                <div style="width: 50%; display: flex; justify-content: center; align-items: center;">
                                    <div style="width: 250px; height: 250px; background-color: ${qrCodeColor}; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                                        <img src="${qrcode}" alt="QR Code" style="width: 80%; height: auto;" />
                                    </div>
                                </div>

                                <div style="width: 50%; text-align: center;">
                                    <div>
                                        ${pedido.data.clienteNome ? `<h1>LOTE ${pedido.data.clienteNome}</h1>` : ""}
                                        <h1>${(() => {
                                            if (!pedido.data) {
                                                return new Date().toLocaleDateString("pt-BR", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })
                                            }
                                            const [day, month, year] = pedido.data.dataEmissao.split("/")
                                            const formattedDateString = `${day.padStart(2, "0")}${month.padStart(
                                                2,
                                                "0"
                                            )}${year.slice(-2)}`
                                            return formattedDateString
                                        })()}${
                pedido.data ? "/" + pedido.data.sequencial + "." + (numPacotes.data.count + 1) : ""
            }</h1>
                                        <p>
                                            ${
                                                pedido.data
                                                    ? new Date().toLocaleDateString("pt-BR", {
                                                          year: "numeric",
                                                          month: "2-digit",
                                                          day: "2-digit",
                                                      })
                                                    : ""
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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

            // await queryRunner.rollbackTransaction()
            await queryRunner.commitTransaction()

            return ok(pdfBuffer)
        } catch (error) {
            console.log("Erro ao criar pacote:", error)
            await queryRunner.rollbackTransaction()
            return serverError(error.message || "Erro ao criar pacote")
        } finally {
            await queryRunner.release()
        }
    }
}

export { CreatePacoteUseCase }
