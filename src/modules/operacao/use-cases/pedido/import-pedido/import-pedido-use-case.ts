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
import { getConnection, QueryRunner } from "typeorm"
import xlsx from "xlsx"
import QRCode from "qrcode"
import puppeteer from "puppeteer"

// Tipagens para os dados do Excel
interface ExcelRow {
    "Ordem de embarque": string | number
    __EMPTY: string | number
    __EMPTY_2: string | number
    __EMPTY_3: string | number
    __EMPTY_5: string | number
    [key: string]: any
}

// Tipagem para o resultado do parse de um item do Excel
interface ParsedPedidoItem {
    produto: string
    produtoNome: string
    quantidade: number
    kit: boolean
}

// Tipagem para o cabeçalho do pedido
interface PedidoCabecalho {
    pedido: string
    dataEmissao: Date
    cliente: string
    rua: string
    bairro: string
    cidade: string
}

// Tipagem para item criado (usado na geração de etiquetas)
interface ItemCriado {
    produto: string
    quantidade: number
    pacoteId: string
    unidade: number
    quantidadeTotal: number
}

// Tipagem para etiqueta gerada
interface Etiqueta {
    produto: string
    numero: number
    total: number
    qrcode: string
}

// Tipagem para dados do QR Code
interface QRCodeDados {
    pedidoId: string
    descricao: string
    pacoteId: string
    kit: boolean
    etiquetaNumero: number
    etiquetaTotal: number
    produto: string
}
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

    async parseExcelData(row: ExcelRow, queryRunner: QueryRunner): Promise<ParsedPedidoItem> {
        try {
            // Validar se os dados necessários existem
            if (!row || !row["Ordem de embarque"]) {
                throw new AppError(`Dados inválidos na linha: ${JSON.stringify(row)}`)
            }

            const nomeProduto = row["Ordem de embarque"].toString().trim()
            if (!nomeProduto) {
                throw new AppError(`Nome do produto vazio na linha: ${JSON.stringify(row)}`)
            }

            // console.log(`Buscando produto: "${nomeProduto}"`)

            const produtoId = await this.produtoRepository.findByNameWithQueryRunner(nomeProduto, queryRunner.manager)
            // console.log("++++++++++")
            // console.log("produtoId", produtoId)
            // console.log("++++++++++")

            // Verificar se houve erro na busca (transação abortada)
            if (produtoId.statusCode === 500) {
                // console.log("ERRO: Transação abortada durante busca do produto!")
                throw new AppError(`Transação abortada ao buscar produto: ${nomeProduto}`)
            }

            if (produtoId.statusCode === 200 && produtoId.data) {
                const result = {
                    produto: produtoId.data.id,
                    produtoNome: nomeProduto,
                    quantidade: row["__EMPTY_3"] ? parseInt(row["__EMPTY_3"].toString()) : 0,
                    kit: row["__EMPTY"] ? row["__EMPTY"].toString().includes("KT") : false,
                }
                return result
            } else {
                const descricaoProduto = row["__EMPTY"] ? row["__EMPTY"].toString().trim() : ""

                // console.log(`Criando novo produto: "${nomeProduto}" com descrição: "${descricaoProduto}"`)

                const newProduto = await this.produtoRepository.createWithQueryRunner(
                    {
                        nome: nomeProduto,
                        descricao: descricaoProduto,
                        tipo: 0,
                    },
                    queryRunner.manager
                )
                // console.log("newProduto", newProduto)

                // Verificar se houve erro na criação (transação abortada)
                if (newProduto.statusCode === 500) {
                    // console.log("ERRO: Transação abortada durante criação do produto!")
                    throw new AppError(`Transação abortada ao criar produto: ${nomeProduto}`)
                }

                if (newProduto.statusCode !== 200 || !newProduto.data) {
                    throw new AppError(`Erro ao criar produto: ${nomeProduto} - ${newProduto.statusCode} - ${newProduto.data}`)
                }

                const result = {
                    produto: newProduto.data.id,
                    produtoNome: nomeProduto,
                    quantidade: row["__EMPTY_3"] ? parseInt(row["__EMPTY_3"].toString()) : 0,
                    kit: row["__EMPTY"] ? row["__EMPTY"].toString().includes("KT") : false,
                }
                return result
            }
        } catch (error) {
            // console.log("Error in parseExcelData:", error)
            throw error // Propagar o erro para cima
        }
    }

    private async parseExcelFile(file: Express.Multer.File): Promise<ExcelRow[]> {
        return new Promise((resolve) => {
            const fileContent = fs.readFileSync(file.path)
            const workbook = xlsx.read(fileContent, { type: "buffer" })
            const sheetNames = workbook.SheetNames
            const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]) as ExcelRow[]

            resolve(excelData)
        })
    }

    async execute(request: IRequest): Promise<HttpResponse> {
        const { file } = request
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const rows = await this.parseExcelFile(file)

            const cabecalho: PedidoCabecalho = {
                pedido: rows[0]["Ordem de embarque"].toString(),
                dataEmissao: moment(rows[0]["__EMPTY_5"].toString().split(": ")[1], "DD/MM/YYYY").toDate(),
                cliente: rows[1]["Ordem de embarque"].toString().split(": ")[1],
                rua: rows[2]["Ordem de embarque"].toString().split(": ")[1],
                bairro: rows[2]["__EMPTY_2"].toString().split(": ")[1],
                cidade: rows[2]["__EMPTY_5"].toString().split(": ")[1],
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
            const itensKit: ParsedPedidoItem[] = []
            const itemsCriados: ItemCriado[] = []
            const pacotesCriados: any[] = []
            const todosItensCriados: any[] = []

            for await (const row of items) {
                const pedidoItemParse: ParsedPedidoItem = await this.parseExcelData(row, queryRunner)

                // Validar se o parse foi bem-sucedido
                if (!pedidoItemParse || !pedidoItemParse.produto) {
                    throw new AppError(`Erro ao processar item do pedido: ${row["Ordem de embarque"]}`)
                }

                // console.log("=== CRIANDO PEDIDO ITEM ===")
                // console.log("Dados do pedidoItem:", {
                //     pedidoId: pedido.data.id,
                //     produto: pedidoItemParse.produto,
                //     quantidade: pedidoItemParse.quantidade,
                //     kit: pedidoItemParse.kit,
                // })

                const pedidoItemResult = await this.pedidoItemRepository.createWithQueryRunner(
                    {
                        pedidoId: pedido.data.id,
                        produto: pedidoItemParse.produto,
                        quantidade: pedidoItemParse.quantidade,
                        kit: pedidoItemParse.kit,
                    },
                    queryRunner.manager
                )

                // console.log("Resultado da criação do pedidoItem:", pedidoItemResult)

                // Verificar se houve erro na criação do pedidoItem
                if (pedidoItemResult.statusCode === 500) {
                    // console.log("ERRO: Transação abortada durante criação do pedidoItem!")
                    throw new AppError(`Transação abortada ao criar pedidoItem para produto: ${pedidoItemParse.produtoNome}`)
                }

                if (pedidoItemResult.statusCode !== 200) {
                    // console.log("ERRO: Falha na criação do pedidoItem!")
                    throw new AppError(
                        `Erro ao criar pedidoItem: ${pedidoItemParse.produtoNome} - Status: ${pedidoItemResult.statusCode}`
                    )
                }

                const produto = await this.produtoRepository.getWithQueryRunner(pedidoItemParse.produto, queryRunner.manager)

                todosItensCriados.push({
                    ...pedidoItemResult.data,
                    produtoDescricao: produto.data.nomeCompleto,
                })

                // console.log("=== PEDIDO ITEM CRIADO COM SUCESSO ===")

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
            const todasEtiquetas: Etiqueta[] = []
            for (const item of itemsCriados) {
                // Cada item já representa uma unidade individual, então criar uma etiqueta para cada
                const qrCodeDados: QRCodeDados = {
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

            // Dividir em páginas com 3 etiquetas por página (na vertical)
            const etiquetasPorPagina = 3
            const paginas: Etiqueta[][] = []

            for (let i = 0; i < todasEtiquetas.length; i += etiquetasPorPagina) {
                const paginaEtiquetas = todasEtiquetas.slice(i, i + etiquetasPorPagina)
                paginas.push(paginaEtiquetas)
            }

            // Gerar HTML para cada página
            let paginasHTML = ""
            const logoDataUrl = fs
                .readFileSync("/opt/projetos/igmp/backend/tmp/logo_IGMP-removebg-preview.png")
                .toString("base64")

            paginas.forEach((pagina, paginaIndex) => {
                let etiquetasHTML = ""

                // Etiquetas em coluna única (uma em cima da outra)
                for (let i = 0; i < pagina.length; i++) {
                    const etiqueta = pagina[i]

                    etiquetasHTML += `
                        <div style="border: 2px solid #000; padding: 12px; text-align: left; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; margin: 0 auto 15px;">
                            <div>
                                <div style="text-align: center; margin-bottom: 8px;">
                                    <img src="data:image/png;base64,${logoDataUrl}" style="height: 50px;">
                                </div>
                                <div style="margin-bottom: 6px; font-size: 12px;">
                                    <strong>Descrição:</strong> ${etiqueta.produto}
                                </div>
                                <div style="margin-bottom: 6px; font-size: 12px;">
                                    <strong>Cliente:</strong> ${nome}
                                </div>
                            </div>
                            <div style="text-align: center; margin-top: auto;">
                                <img src="${etiqueta.qrcode}" style="width: 150px; height: 150px; margin: 0 auto 5px; display: block;">
                                <div style="font-size: 10px;">
                                    Etiqueta ${etiqueta.numero} de ${etiqueta.total}
                                </div>
                            </div>
                        </div>
                    `
                }

                paginasHTML += `
                    <div class="pagina" style="page-break-after: always;">
                        <h2>${pedido.data.descricao} - Cliente: ${nome}</h2>
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

            await browser.close()

            const result = {
                pedido: pedido.data,
                itens: todosItensCriados,
                itemsCriados: itemsCriados.map((item) => ({
                    ...item,
                    torre: "",
                    andar: null,
                    apto: null,
                    ambiente: "",
                })),
            }

            fs.unlinkSync(file.path)
            await queryRunner.rollbackTransaction()
            // await queryRunner.commitTransaction()
            // return itensKit.length > 0 ? ok(pdfBuffer) : noContent()
            return ok(result)
        } catch (error) {
            // console.log("---------------")
            console.log(error)
            // console.log("---------------")
            fs.unlinkSync(file.path)
            await queryRunner.rollbackTransaction()
            return serverError(error)
        } finally {
            await queryRunner.release()
        }
    }
}

export { ImportPedidosUseCase }
