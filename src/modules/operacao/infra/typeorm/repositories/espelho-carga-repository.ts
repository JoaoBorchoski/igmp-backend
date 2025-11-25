import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { IEspelhoCargaDTO } from "@modules/operacao/dtos/i-espelho-carga-dto"
import { IEspelhoCargaRepository } from "@modules/operacao/repositories/i-espelho-carga-repository"
import { EspelhoCarga } from "@modules/operacao/infra/typeorm/entities/espelho-carga"
import { noContent, serverError, ok, notFound, HttpResponse } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class EspelhoCargaRepository implements IEspelhoCargaRepository {
	private repository: Repository<EspelhoCarga>

	constructor() {
		this.repository = getRepository(EspelhoCarga)
	}

	// create
	async create({ pedidoId, placa, motorista, lote, descricao }: IEspelhoCargaDTO): Promise<HttpResponse> {
		const espelhoCarga = this.repository.create({
			pedidoId,
			placa,
			motorista,
			lote,
			descricao,
		})

		const result = await this.repository
			.save(espelhoCarga)
			.then((espelhoCargaResult) => {
				return ok(espelhoCargaResult)
			})
			.catch((error) => {
				return serverError(error)
			})

		return result
	}

	async createWithQueryRunner(
		{ pedidoId, placa, motorista, lote, descricao }: IEspelhoCargaDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse> {
		try {
			if (!transactionManager.queryRunner || !transactionManager.queryRunner.isTransactionActive) {
				console.log("ERRO: Transação não está mais ativa ao tentar criar espelho_carga!")
				return serverError(new Error("Transação não está mais ativa"))
			}

			const espelhoCarga = transactionManager.create(EspelhoCarga, {
				pedidoId,
				placa,
				motorista,
				lote,
				descricao,
			})

			const result = await transactionManager
				.save(espelhoCarga)
				.then((espelhoCargaResult) => {
					return ok(espelhoCargaResult)
				})
				.catch((error) => {
					return serverError(error)
				})

			return result
		} catch (error) {
			console.log("Erro geral na criação do espelho_carga:", error)
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
			columnName = "placa"
			columnDirection = "ASC"
		} else {
			columnName = order.substring(0, 1) === "-" ? order.substring(1) : order
			columnDirection = order.substring(0, 1) === "-" ? "DESC" : "ASC"
		}

		const referenceArray = ["placa", "motorista", "lote"]
		const columnOrder = new Array<"ASC" | "DESC">(3).fill("ASC")

		const index = referenceArray.indexOf(columnName)

		columnOrder[index] = columnDirection

		const offset = rowsPerPage * page

		try {
			let query = this.repository.createQueryBuilder("ec").select([
				'ec.id as "id"',
				'ec.pedidoId as "pedidoId"',
				'ec.placa as "placa"',
				'ec.motorista as "motorista"',
				'ec.lote as "lote"',
				'ec.descricao as "descricao"',
				`(
						CASE 
							WHEN (
								SELECT COUNT(*) 
								FROM espelho_carga_items eci 
								WHERE eci.espelho_carga_id = ec.id
							) = 0 THEN false
							WHEN (
								SELECT COUNT(*) 
								FROM espelho_carga_items eci 
								WHERE eci.espelho_carga_id = ec.id AND eci.confirmado = true
							) = (
								SELECT COUNT(*) 
								FROM espelho_carga_items eci 
								WHERE eci.espelho_carga_id = ec.id
							) THEN true
							ELSE false
						END
					) as "confirmado"`,
			])

			if (filter) {
				query = query.where(filter)
			}

			const espelhosCarga = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(ec.placa AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(ec.motorista AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(ec.lote AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(ec.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.addOrderBy("ec.placa", columnOrder[0])
				.addOrderBy("ec.motorista", columnOrder[1])
				.addOrderBy("ec.lote", columnOrder[2])
				.offset(offset)
				.limit(rowsPerPage)
				.take(rowsPerPage)
				.getRawMany()

			return ok(espelhosCarga)
		} catch (err) {
			return serverError(err)
		}
	}

	// select
	async select(filter: string): Promise<HttpResponse> {
		try {
			const espelhosCarga = await this.repository
				.createQueryBuilder("ec")
				.select(['ec.id as "value"', "CONCAT(ec.placa, ' - ', ec.motorista) as \"label\""])
				.where("ec.placa ilike :filter", { filter: `${filter}%` })
				.orWhere("ec.motorista ilike :filter", { filter: `${filter}%` })
				.orWhere("ec.descricao ilike :filter", { filter: `${filter}%` })
				.addOrderBy("ec.descricao")
				.getRawMany()

			return ok(espelhosCarga)
		} catch (err) {
			console.log("Error in select:", err)
			return serverError(err)
		}
	}

	// id select
	async idSelect(id: string): Promise<HttpResponse> {
		try {
			const espelhoCarga = await this.repository
				.createQueryBuilder("ec")
				.select(['ec.id as "value"', "CONCAT(ec.placa, ' - ', ec.motorista) as \"label\""])
				.where("ec.id = :id", { id: `${id}` })
				.getRawOne()

			return ok(espelhoCarga)
		} catch (err) {
			console.log("Error in idSelect:", err)
			return serverError(err)
		}
	}

	// count
	async count(search: string, filter: string): Promise<HttpResponse> {
		try {
			let query = this.repository.createQueryBuilder("ec").select(['ec.id as "id"']).leftJoin("ec.pedidoId", "p")

			if (filter) {
				query = query.where(filter)
			}

			const espelhosCarga = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(ec.placa AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(ec.motorista AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(ec.lote AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(p.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.getRawMany()

			return ok({ count: espelhosCarga.length })
		} catch (err) {
			return serverError(err)
		}
	}

	// get
	async get(id: string): Promise<HttpResponse> {
		try {
			const espelhoCarga = await this.repository
				.createQueryBuilder("ec")
				.select([
					'ec.id as "id"',
					'ec.pedidoId as "pedidoId"',
					'p.sequencial as "pedidoSequencial"',
					'ec.placa as "placa"',
					'ec.motorista as "motorista"',
					'ec.lote as "lote"',
					'ec.descricao as "descricao"',
					`TO_CHAR(ec.createdAt, 'DD/MM/YYYY') as "createdAt"`,
					`TO_CHAR(ec.updatedAt, 'DD/MM/YYYY') as "updatedAt"`,
				])
				.leftJoin("ec.pedidoId", "p")
				.where("ec.id = :id", { id })
				.getRawOne()

			if (typeof espelhoCarga === "undefined") {
				return noContent()
			}

			const espelhoCargaItemsData = await this.repository.query(
				`
					SELECT
						eci.id,
						p.id as "pacoteId",
						p.descricao as "pacoteDescricao",
						eci.pacote_item_id as "espelhoCargaId",
						pi.produto as "produtoId",
						CONCAT(p3.nome, ' - ', p3.descricao) as "produtoNome",
						eci.quantidade as "quantidade", 
						pi.id as "pacoteItemId",
						eci.confirmado as "confirmado"
					FROM espelho_carga_items eci 
					LEFT JOIN pacotes_items pi ON pi.id = eci.pacote_item_id 
					LEFT JOIN pacotes p ON p.id = pi.pacote_id 
					LEFT JOIN produtos p3 ON p3.id::varchar = pi.produto
					WHERE eci.espelho_carga_id = $1
					ORDER BY p.id, eci.id
				`,
				[id]
			)

			const pacotesMap = new Map<string, any>()

			espelhoCargaItemsData.forEach((item: any) => {
				const pacoteId = item.pacoteId

				if (!pacoteId) return

				if (!pacotesMap.has(pacoteId)) {
					pacotesMap.set(pacoteId, {
						id: pacoteId,
						descricao: item.pacoteDescricao,
						confirmado: item.confirmado || false,
						items: [],
					})
				}

				const pacote = pacotesMap.get(pacoteId)
				pacote.items.push({
					id: item.pacoteItemId,
					produto: item.produtoId,
					produto_nome: item.produtoNome,
					quantidade: item.quantidade?.toString() || "0",
					confirmado: item.confirmado || false,
				})
			})

			const espelhoCargaItems = Array.from(pacotesMap.values())
			const pacoteIds = Array.from(pacotesMap.keys())

			const result = {
				pedidoId: espelhoCarga.pedidoId || null,
				pacoteId: null,
				placa: espelhoCarga.placa || "",
				motorista: espelhoCarga.motorista || "",
				lote: espelhoCarga.lote || "",
				descricao: espelhoCarga.descricao || "",
				espelhoCargaItems: espelhoCargaItems,
			}

			return ok(result)
		} catch (err) {
			console.log("Error in get:", err)
			return serverError(err)
		}
	}

	// update
	async update({ id, pedidoId, placa, motorista, lote }: IEspelhoCargaDTO): Promise<HttpResponse> {
		const espelhoCarga = await this.repository.findOne(id)

		if (!espelhoCarga) {
			return notFound()
		}

		const newEspelhoCarga = this.repository.create({
			id,
			pedidoId,
			placa,
			motorista,
			lote,
		})

		try {
			await this.repository.save(newEspelhoCarga)

			return ok(newEspelhoCarga)
		} catch (err) {
			return serverError(err)
		}
	}

	async updateWithQueryRunner(
		{ id, pedidoId, placa, motorista, lote }: IEspelhoCargaDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse> {
		const espelhoCarga = await transactionManager.findOne(EspelhoCarga, id)

		if (!espelhoCarga) {
			return notFound()
		}

		const newEspelhoCarga = transactionManager.create(EspelhoCarga, {
			id,
			pedidoId,
			placa,
			motorista,
			lote,
		})

		try {
			await transactionManager.save(EspelhoCarga, newEspelhoCarga)

			return ok(newEspelhoCarga)
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
}

export { EspelhoCargaRepository }
