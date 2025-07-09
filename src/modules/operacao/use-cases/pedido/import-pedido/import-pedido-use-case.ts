import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"
import { IClienteRepository } from "@modules/configuracao/repositories/i-cliente-repository"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
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
        private clienteRepository: IClienteRepository
    ) {}

    async parseExcelData(row: any, queryRunner: any): Promise<any> {
        const produtoId = await this.produtoRepository.findByNameWithQueryRunner(row["Ordem de embarque"], queryRunner)

        if (!produtoId) return null

        const result = {
            produto: produtoId.data.id,
            quantidade: row["__EMPTY_3"] ? parseInt(row["__EMPTY_3"]) : 0,
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
                data: { id },
            } = await this.clienteRepository.findByName(cabecalho.cliente)

            const pedido = await this.pedidoRepository.createWithQueryRunner(
                {
                    descricao: cabecalho.pedido,
                    cliente: id,
                    dataEmissao: new Date(cabecalho.dataEmissao),
                },
                queryRunner.manager
            )

            const items = rows.slice(6, rows.length - 2)

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
                    },
                    queryRunner.manager
                )
            }

            fs.unlinkSync(file.path)
            await queryRunner.commitTransaction()
            return noContent()
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
