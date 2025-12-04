import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { ITipoPortaDTO } from "@modules/configuracao/dtos/i-tipo-porta-dto"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"
import { Produto } from "../entities/produto"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"
import { IProdutoDTO } from "@modules/configuracao/dtos/i-produto"

class ProdutoRepository implements IProdutoRepository {
	private repository: Repository<Produto>

	constructor() {
		this.repository = getRepository(Produto)
	}

	// create
	async create({
		nome,
		descricao,
		tipo,
		sentidoAbertura,
		tipoPorta,
		tipoEnchimento,
		fechadura,
		alturaPorta,
		larguraPorta,
		espessuraPorta,
		larguraBatatente,
		espessuraCanalAlizar,
	}: IProdutoDTO): Promise<HttpResponse> {
		try {
			const produto = this.repository.create({
				nome,
				descricao,
				tipo,
				sentidoAbertura,
				tipoPorta,
				tipoEnchimento,
				fechadura,
				alturaPorta,
				larguraPorta,
				espessuraPorta,
				larguraBatatente,
				espessuraCanalAlizar,
			})

			const result = await this.repository
				.save(produto)
				.then((produtoResult) => {
					return ok(produtoResult)
				})
				.catch((error) => {
					return serverError(error)
				})

			return result
		} catch (error) {
			return serverError(error)
		}
	}

	async createWithQueryRunner(
		{
			nome,
			descricao,
			tipo,
			sentidoAbertura,
			tipoPorta,
			tipoEnchimento,
			fechadura,
			alturaPorta,
			larguraPorta,
			espessuraPorta,
			larguraBatatente,
			espessuraCanalAlizar,
		}: IProdutoDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse> {
		try {
			// Verificar se a transação ainda está ativa
			if (!transactionManager.queryRunner || !transactionManager.queryRunner.isTransactionActive) {
				console.log("ERRO: Transação não está mais ativa ao tentar criar produto!")
				return serverError(new Error("Transação não está mais ativa"))
			}
			const produto = transactionManager.create(Produto, {
				nome,
				descricao,
				tipo,
				sentidoAbertura,
				tipoPorta,
				tipoEnchimento,
				fechadura,
				alturaPorta,
				larguraPorta,
				espessuraPorta,
				larguraBatatente,
				espessuraCanalAlizar,
			})

			const result = await transactionManager
				.save(produto)
				.then((produtoResult) => {
					return ok(produtoResult)
				})
				.catch((error) => {
					return serverError(error)
				})

			return result
		} catch (error) {
			console.log("Error in createWithQueryRunner:", error)
			return serverError(error)
		}
	}

	// list
	async list(
		search: string,
		page: number,
		rowsPerPage: number,
		order: string,
		filter: string
	): Promise<HttpResponse> {
		let columnName: string
		let columnDirection: "ASC" | "DESC"

		if (typeof order === "undefined" || order === "") {
			columnName = "nome"
			columnDirection = "ASC"
		} else {
			columnName = order.substring(0, 1) === "-" ? order.substring(1) : order
			columnDirection = order.substring(0, 1) === "-" ? "DESC" : "ASC"
		}

		const referenceArray = ["nome", "descricao"]
		const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

		const index = referenceArray.indexOf(columnName)

		columnOrder[index] = columnDirection

		const offset = rowsPerPage * page

		try {
			let query = this.repository
				.createQueryBuilder("prod")
				.select([
					'prod.id as "id"',
					"CONCAT(prod.nome, ' - ', prod.descricao) as \"nome\"",
					"CASE WHEN prod.tipo = 0 THEN 'Peça Final' ELSE 'Kit' END as \"tipo\"",
				])

			if (filter) {
				query = query.where(filter)
			}

			const produtos = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(prod.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(prod.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.addOrderBy("prod.nome", columnOrder[0])
				.addOrderBy("prod.descricao", columnOrder[1])
				.offset(offset)
				.limit(rowsPerPage)
				.take(rowsPerPage)
				.getRawMany()

			return ok(produtos)
		} catch (err) {
			console.error("Error listing produtos:", err)
			return serverError(err)
		}
	}

	// select
	async select(filter: string): Promise<HttpResponse> {
		try {
			const tiposPorta = await this.repository
				.createQueryBuilder("tip")
				.select(['tip.id as "value"', `tip.nome || ' - ' || tip.descricao as "label"`, 'tip.nome as "nome"'])
				.where("tip.nome ilike :filter", { filter: `%${filter}%` })
				.orWhere("tip.descricao ilike :filter", { filter: `%${filter}%` })
				.addOrderBy("tip.nome")
				.limit(50)
				.getRawMany()

			return ok(tiposPorta)
		} catch (err) {
			return serverError(err)
		}
	}

	// id select
	async idSelect(id: string): Promise<HttpResponse> {
		try {
			const tipoPorta = await this.repository
				.createQueryBuilder("tip")
				.select(['tip.id as "value"', `tip.nome || ' - ' || tip.descricao as "label"`])
				.where("tip.id = :id", { id: `${id}` })
				.getRawOne()

			return ok(tipoPorta)
		} catch (err) {
			return serverError(err)
		}
	}

	// count
	async count(search: string, filter: string): Promise<HttpResponse> {
		try {
			let query = this.repository.createQueryBuilder("tip").select(['tip.id as "id"'])

			if (filter) {
				query = query.where(filter)
			}

			const tiposPorta = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(tip.nome AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(tip.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.getRawMany()

			return ok({ count: tiposPorta.length })
		} catch (err) {
			return serverError(err)
		}
	}

	// get
	async get(id: string): Promise<HttpResponse> {
		try {
			const tipoPorta = await this.repository
				.createQueryBuilder("tip")
				.select([
					'tip.id as "id"',
					'tip.nome as "nome"',
					`tip.nome || ' - ' || tip.descricao as "nomeCompleto"`,
					'tip.descricao as "descricao", tip.tipo as "tipo", tip.sentidoAbertura as "sentidoAbertura", tip.tipoPorta as "tipoPorta", tip.tipoEnchimento as "tipoEnchimento", tip.fechadura as "fechadura", tip.alturaPorta as "alturaPorta", tip.larguraPorta as "larguraPorta", tip.espessuraPorta as "espessuraPorta", tip.larguraBatatente as "larguraBatatente", tip.espessuraCanalAlizar as "espessuraCanalAlizar"',
				])
				.where("tip.id = :id", { id })
				.getRawOne()

			if (typeof tipoPorta === "undefined") {
				return noContent()
			}

			return ok(tipoPorta)
		} catch (err) {
			console.log("Error getting tipoPorta:", err)
			return serverError(err)
		}
	}

	async getWithQueryRunner(id: string, transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			const produto = await transactionManager
				.createQueryBuilder(Produto, "prod")
				.select([
					'prod.id as "id"',
					'prod.nome as "nome"',
					`prod.nome || ' - ' || prod.descricao as "nomeCompleto"`,
					'prod.descricao as "descricao", prod.tipo as "tipo", prod.sentidoAbertura as "sentidoAbertura", prod.tipoPorta as "tipoPorta", prod.tipoEnchimento as "tipoEnchimento", prod.fechadura as "fechadura", prod.alturaPorta as "alturaPorta", prod.larguraPorta as "larguraPorta", prod.espessuraPorta as "espessuraPorta", prod.larguraBatatente as "larguraBatatente", prod.espessuraCanalAlizar as "espessuraCanalAlizar"',
				])
				.where("prod.id = :id", { id })
				.getRawOne()

			if (typeof produto === "undefined") {
				return noContent()
			}

			return ok(produto)
		} catch (err) {
			console.log("Error getting produto:", err)
			return serverError(err)
		}
	}

	// update
	async update({ id, nome, descricao }: ITipoPortaDTO): Promise<HttpResponse> {
		const tipoPorta = await this.repository.findOne(id)

		if (!tipoPorta) {
			return notFound()
		}

		const newtipoPorta = this.repository.create({
			id,
			nome,
			descricao,
		})

		try {
			await this.repository.save(newtipoPorta)

			return ok(newtipoPorta)
		} catch (err) {
			return serverError(err)
		}
	}

	// delete
	async delete(id: string): Promise<HttpResponse> {
		try {
			await this.repository.delete(id)

			return noContent()
		} catch (err) {
			if (err.message.slice(0, 10) === "null value") {
				throw new AppError("not null constraint", 404)
			}

			return serverError(err)
		}
	}

	// multi delete
	async multiDelete(ids: string[]): Promise<HttpResponse> {
		try {
			await this.repository.delete(ids)

			return noContent()
		} catch (err) {
			if (err.message.slice(0, 10) === "null value") {
				throw new AppError("not null constraint", 404)
			}

			return serverError(err)
		}
	}

	async findByName(nome: string): Promise<HttpResponse> {
		try {
			const produto = await this.repository
				.createQueryBuilder("prod")
				.select(['prod.id as "id"', 'prod.nome as "nome"'])
				.where("prod.nome like :nome", { nome: `%${nome}%` })
				.orWhere("prod.descricao like :nome", { nome: `%${nome}%` })
				.getRawOne()

			if (!produto) {
				return null
			}

			return ok(produto)
		} catch (err) {
			return serverError(err)
		}
	}

	async findByNameWithQueryRunner(nome: string, transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			// Verificar se a transação ainda está ativa
			if (!transactionManager.queryRunner || !transactionManager.queryRunner.isTransactionActive) {
				// console.log("ERRO: Transação não está mais ativa!")
				return serverError(new Error("Transação não está mais ativa"))
			}

			// Validar entrada
			if (!nome || typeof nome !== "string") {
				// console.log("Nome inválido fornecido:", nome)
				return noContent()
			}

			const nomeLimpo = nome.trim()
			if (!nomeLimpo) {
				// console.log("Nome vazio após trim:", nome)
				return noContent()
			}

			// console.log(`Executando query para produto: "${nomeLimpo}"`)
			// console.log(`Tipo do nome: ${typeof nomeLimpo}, Tamanho: ${nomeLimpo.length}`)

			// Primeiro tentar busca exata (case sensitive)
			let produto = await transactionManager
				.createQueryBuilder(Produto, "prod")
				.select(['prod.id as "id"', 'prod.nome as "nome"', 'prod.descricao as "descricao"'])
				.where("prod.nome = :nome", { nome: nomeLimpo })
				.getRawOne()

			// console.log(`Resultado busca exata:`, produto)

			// Se não encontrou com busca exata, tentar case insensitive
			if (!produto) {
				// console.log(`Busca exata falhou, tentando case insensitive para: "${nomeLimpo}"`)
				produto = await transactionManager
					.createQueryBuilder(Produto, "prod")
					.select(['prod.id as "id"', 'prod.nome as "nome"', 'prod.descricao as "descricao"'])
					.where("LOWER(prod.nome) = LOWER(:nome)", { nome: nomeLimpo })
					.getRawOne()
			}

			// console.log(`Resultado busca case insensitive:`, produto)

			// Se ainda não encontrou, tentar com LIKE
			if (!produto) {
				// console.log(`Busca case insensitive falhou, tentando com LIKE para: "${nomeLimpo}"`)
				produto = await transactionManager
					.createQueryBuilder(Produto, "prod")
					.select(['prod.id as "id"', 'prod.nome as "nome"', 'prod.descricao as "descricao"'])
					.where("prod.nome like :nome", { nome: `%${nomeLimpo}%` })
					.orWhere("prod.descricao like :nome", { nome: `%${nomeLimpo}%` })
					.getRawOne()
			}

			// console.log(`Resultado busca LIKE:`, produto)

			if (!produto) {
				// console.log(`Produto não encontrado: "${nomeLimpo}"`)

				// Debug: listar produtos que começam com as primeiras letras
				const prefixo = nomeLimpo.substring(0, 2)
				// console.log(`Buscando produtos que começam com "${prefixo}" para debug...`)

				const produtosDebug = await transactionManager
					.createQueryBuilder(Produto, "prod")
					.select(['prod.id as "id"', 'prod.nome as "nome"', 'prod.descricao as "descricao"'])
					.where("prod.nome like :prefixo", { prefixo: `${prefixo}%` })
					.limit(10)
					.getRawMany()

				// console.log(`Produtos encontrados com prefixo "${prefixo}":`, produtosDebug)

				return noContent()
			}

			// console.log(`Produto encontrado:`, produto)
			return ok(produto)
		} catch (err) {
			console.log("Error in findByNameWithQueryRunner:", err)
			return serverError(err)
		}
	}
}

export { ProdutoRepository }
