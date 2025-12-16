import { inject, injectable } from "tsyringe"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { getConnection } from "typeorm"
import xlsx from "xlsx"
import fs from "fs"
import path from "path"
import { IEstadoRepository } from "@modules/comum/repositories/i-estado-repository"
import { ICidadeRepository } from "@modules/comum/repositories/i-cidade-repository"
import { IClienteRepository } from "@modules/configuracao/repositories/i-cliente-repository"

interface IRequest {
	file: Express.Multer.File
}

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

	async processSingleRow(row: any): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		try {
			const prod = {
				nome: row["Código"],
				descricao: row["Descrição"],
				tipo: row.grupo == "AC" ? 0 : 1,
			}

			const produto = await this.produtoRepository.findByCodeAndDescriptionWithQueryRunner(
				prod.nome,
				prod.descricao,
				queryRunner.manager
			)

			if (produto.statusCode === 200 && produto.data) {
				await queryRunner.commitTransaction()
				return ok({ message: "Produto já existe", produto: produto.data })
			}

			const newProduto = await this.produtoRepository.createWithQueryRunner(prod, queryRunner.manager)

			await queryRunner.commitTransaction()
			return ok(newProduto)
		} catch (error) {
			console.error("Error processing row:", error)
			await queryRunner.rollbackTransaction()
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}

	async execute(request: IRequest): Promise<HttpResponse> {
		const queryRunner = getConnection().createQueryRunner()
		await queryRunner.startTransaction()

		// const file = path.resolve(__dirname, "clientes.xlsx")
		const { file } = request

		const result = []

		try {
			const rows = await this.parseExcelFile(file)

			for (const row of rows) {
				const prod = {
					nome: row["Código"],
					descricao: row["Descrição"],
					tipo: row.grupo == "AC" ? 0 : 1,
				}

				const produto = await this.produtoRepository.findByCodeAndDescriptionWithQueryRunner(
					prod.nome,
					prod.descricao,
					queryRunner.manager
				)

				if (produto.statusCode === 200 && produto.data) {
					continue
				}

				const newProduto = await this.produtoRepository.createWithQueryRunner(prod, queryRunner.manager)

				result.push(newProduto)
			}

			await queryRunner.commitTransaction()
			return ok(result)
		} catch (error) {
			console.error("Error processing Excel file:", error)
			await queryRunner.rollbackTransaction()
			return serverError(error)
		} finally {
			await queryRunner.release()
		}
	}
}

export { ImportProdutoUseCase }
