import { inject, injectable } from "tsyringe"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse } from "@shared/helpers"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { getConnection } from "typeorm"
import xlsx from "xlsx"
import fs from "fs"
import path from "path"
import { IEstadoRepository } from "@modules/comum/repositories/i-estado-repository"
import { ICidadeRepository } from "@modules/comum/repositories/i-cidade-repository"
import { IClienteRepository } from "@modules/configuracao/repositories/i-cliente-repository"

@injectable()
class ImportProdutoUseCase {
    constructor(
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository,
        @inject("EstadoRepository")
        private estadoRepository: IEstadoRepository,
        @inject("CidadeRepository")
        private cidadeRepository: ICidadeRepository,
        @inject("ClienteRepository")
        private clienteRepository: IClienteRepository
    ) {}

    private async parseExcelFile(file: Express.Multer.File): Promise<any[]> {
        return new Promise((resolve) => {
            const fileContent = fs.readFileSync(file.path)
            const workbook = xlsx.read(fileContent, { type: "buffer" })
            const sheetNames = workbook.SheetNames
            const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

            resolve(excelData)
        })
    }

    async execute(): Promise<any> {
        const queryRunner = getConnection().createQueryRunner()
        await queryRunner.startTransaction()

        const file = path.resolve(__dirname, "clientes.xlsx")

        const result = []

        try {
            const rows = await this.parseExcelFile({ path: file } as Express.Multer.File)

            for (const row of rows) {
                //Cliente import logic
                const estado = await this.estadoRepository.getByName(row.estado)
                const cidade = await this.cidadeRepository.getByName(row.cidade, estado.data.id)
                console.log("Estado:", estado)
                console.log("Cidade:", cidade)
                console.log("Row:", row)
                await this.clienteRepository.createWithQueryRunner(
                    {
                        nome: row.nome,
                        cpf: row.cpf.replace(/\D/g, ""),
                        telefone: row.telefone,
                        email: row.nome.replace(/\s/g, "").toLowerCase() + "@mail.com",
                        cidadeId: cidade.data.id,
                        estadoId: estado.data.id,
                    },
                    queryRunner.manager
                )
                //
                //
                //
                // Produto import logic
                // const produtoData = await this.produtoRepository.createWithQueryRunner(
                //     {
                //         nome: row.codigo,
                //         descricao: row.descricao,
                //         tipo: row.grupo == "AC" ? 0 : 1,
                //     },
                //     queryRunner.manager
                // )
                // result.push(produtoData)
            }

            await queryRunner.commitTransaction()
        } catch (error) {
            console.error("Error processing Excel file:", error)
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }
}

export { ImportProdutoUseCase }
