import { Brackets, EntityManager, getRepository, Repository } from "typeorm"
import { IPacoteDTO } from "@modules/operacao/dtos/i-pacote-dto"
import { IPacoteRepository } from "@modules/operacao/repositories/i-pacote-repository"
import { Pacote } from "@modules/operacao/infra/typeorm/entities/pacote"
import { noContent, serverError, ok, notFound, HttpResponse, conflictError } from "@shared/helpers"
import { AppError } from "@shared/errors/app-error"

class PacoteRepository implements IPacoteRepository {
	private repository: Repository<Pacote>

	constructor() {
		this.repository = getRepository(Pacote)
	}

	// create
	async create({ pedidoId, descricao }: IPacoteDTO): Promise<HttpResponse> {
		const pacote = this.repository.create({
			pedidoId,
			descricao,
		})

		const result = await this.repository
			.save(pacote)
			.then((pacoteResult) => {
				return ok(pacoteResult)
			})
			.catch((error) => {
				return serverError(error)
			})

		return result
	}

	async createWithQueryRunner(
		{ pedidoId, descricao }: IPacoteDTO,
		transactionManager: EntityManager
	): Promise<HttpResponse> {
		const seqAtual = await this.repository
			.createQueryBuilder("ped")
			.select("MAX(ped.sequencial) :: INTEGER", "maxSequencial")
			.getRawOne()

		const sequencial = seqAtual.maxSequencial ? seqAtual.maxSequencial + 1 : 1

		const pacote = transactionManager.create(Pacote, {
			pedidoId,
			descricao,
			sequencial,
		})

		const result = await transactionManager
			.save(pacote)
			.then((pacoteResult) => {
				return ok(pacoteResult)
			})
			.catch((error) => {
				return serverError(error)
			})

		return result
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

		const referenceArray = ["pedidoSequencial", "descricao"]
		const columnOrder = new Array<"ASC" | "DESC">(2).fill("ASC")

		const index = referenceArray.indexOf(columnName)

		columnOrder[index] = columnDirection

		const offset = rowsPerPage * page

		try {
			let query = this.repository
				.createQueryBuilder("pac")
				.select([
					'pac.id as "id"',
					'a.id as "pedidoId"',
					'a.sequencial as "pedidoSequencial"',
					'pac.descricao as "descricao"',
					'pac.sequencial as "sequencial"',
				])
				.leftJoin("pac.pedidoId", "a")

			if (filter) {
				query = query.where(filter)
			}

			const pacotes = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(a.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(pac.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(pac.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.addOrderBy("a.sequencial", columnOrder[0])
				.addOrderBy("pac.descricao", columnOrder[1])
				.offset(offset)
				.limit(rowsPerPage)
				.take(rowsPerPage)
				.getRawMany()

			return ok(pacotes)
		} catch (err) {
			return serverError(err)
		}
	}

	// select
	async select(filter: string): Promise<HttpResponse> {
		try {
			const pacotes = await this.repository
				.createQueryBuilder("pac")
				.select(['pac.id as "value"', 'pac.id as "label"'])
				.where("pac.id ilike :filter", { filter: `${filter}%` })
				.addOrderBy("pac.id")
				.getRawMany()

			return ok(pacotes)
		} catch (err) {
			return serverError(err)
		}
	}

	// id select
	async idSelect(id: string): Promise<HttpResponse> {
		try {
			const pacote = await this.repository
				.createQueryBuilder("pac")
				.select(['pac.id as "value"', 'pac.id as "label"'])
				.where("pac.id = :id", { id: `${id}` })
				.getRawOne()

			return ok(pacote)
		} catch (err) {
			return serverError(err)
		}
	}

	// count
	async count(search: string, filter: string): Promise<HttpResponse> {
		try {
			let query = this.repository
				.createQueryBuilder("pac")
				.select(['pac.id as "id"'])
				.leftJoin("pac.pedidoId", "a")

			if (filter) {
				query = query.where(filter)
			}

			const pacotes = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere("CAST(a.sequencial AS VARCHAR) ilike :search", { search: `%${search}%` })
						query.orWhere("CAST(pac.descricao AS VARCHAR) ilike :search", { search: `%${search}%` })
					})
				)
				.getRawMany()

			return ok({ count: pacotes.length })
		} catch (err) {
			return serverError(err)
		}
	}

	// get
	async get(id: string): Promise<HttpResponse> {
		try {
			const pacote = await this.repository
				.createQueryBuilder("pac")
				.select([
					'pac.id as "id"',
					'pac.pedidoId as "pedidoId"',
					'a.sequencial as "pedidoSequencial"',
					'pac.descricao as "descricao"',
					"CONCAT(a.sequencial, ' - ', c.nome) as \"pedidoLabel\"",
				])
				.leftJoin("pac.pedidoId", "a")
				.leftJoin("clientes", "c", "c.id :: varchar = a.cliente")
				.where("pac.id = :id", { id })
				.getRawOne()

			if (typeof pacote === "undefined") {
				return noContent()
			}

			const pacoteItens = await this.repository.query(
				`
                SELECT
                    pi.id,
                    pi.pacote_id,
                    pi.produto,
                    p.nome || ' - ' || p.descricao produto_nome,
                    pi.quantidade,
                    pi.quantidade_lateral,
                    pi.quantidade_cabeceira,
                    pi.quantidade_lateral_cabeceira,
                    pi.tipo_item,
                    pi.confirmado
                FROM 
                    pacotes_items pi
                JOIN 
                    produtos p ON p.id :: varchar = pi.produto
                WHERE 
                    pi.pacote_id = $1
            `,
				[pacote.id]
			)

			pacote.items = pacoteItens

			return ok(pacote)
		} catch (err) {
			console.log(err)
			return serverError(err)
		}
	}

	async getProdutoInfo(pedidoItemId: string, pedidoId: string): Promise<HttpResponse> {
		try {
			const pacote = await this.repository.query(
				`
                    SELECT 
                        pi.quantidade :: integer as quantidade,
                        pi.produto
                    FROM 
                        pedidos_items pi
                    WHERE 
                        pi.id = $1
                `,
				[pedidoItemId]
			)

			if (!pacote) {
				return notFound()
			}

			const quantidadeUsada = await this.repository.query(
				`
                    SELECT 
                        SUM(pac.quantidade) :: float as quantidade_usada
                    FROM 
                        pacotes_items pac
                    JOIN 
                        pacotes p ON p.id = pac.pacote_id
                    JOIN
                        pedidos_items pi ON pi.id = $2
                    WHERE 
                        p.pedido_id = $1
                `,
				[pedidoId, pedidoItemId]
			)

			const quantidadeDisponivel = (pacote[0]?.quantidade ?? 0) - (quantidadeUsada[0]?.quantidade_usada ?? 0)

			pacote[0] = { ...pacote[0], quantidadeDisponivel }

			return ok(pacote[0])
		} catch (err) {
			return serverError(err)
		}
	}

	// update
	async update({ id, pedidoId, descricao }: IPacoteDTO): Promise<HttpResponse> {
		const pacote = await this.repository.findOne(id)

		if (!pacote) {
			return notFound()
		}

		const newpacote = this.repository.create({
			id,
			pedidoId,
			descricao,
		})

		try {
			await this.repository.save(newpacote)

			return ok(newpacote)
		} catch (err) {
			return serverError(err)
		}
	}

	async updatePacoteItemStatus(id: string, espelhoCargaId: string): Promise<HttpResponse> {
		try {
			const isFromEspelhoCarga = await this.repository.query(
				`
				select ec.id
				from espelho_carga ec
				left join espelho_carga_items eci on eci.espelho_carga_id = ec.id
				left join pacotes_items pi on pi.id = eci.pacote_item_id 
				left join pacotes p on p.id = pi.pacote_id 
				where ec.id = $1 and p.id = $2
			`,
				[espelhoCargaId, id]
			)

			if (!isFromEspelhoCarga || isFromEspelhoCarga.length === 0) {
				return conflictError("Pacote não pertence ao espelho de carga")
			}

			const updated = await this.repository.query(
				`
					UPDATE espelho_carga_items eci
					SET confirmado = true
					FROM pacotes_items pi
					LEFT JOIN pacotes p ON p.id = pi.pacote_id
					WHERE pi.id = eci.pacote_item_id
					  AND eci.espelho_carga_id = $1
					  AND p.id = $2
            `,
				[espelhoCargaId, id]
			)

			return ok(updated)
		} catch (error) {
			console.log("Error updating pacote item status:", error)
			return serverError(error)
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

	async deleteWithQueryRunner(id: string, transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			await transactionManager.query(
				`
                DELETE FROM 
                    pacotes_items
                WHERE 
                    pacote_id = $1
            `,
				[id]
			)

			await transactionManager.delete(Pacote, id)

			return noContent()
		} catch (err) {
			if (err.message.slice(0, 10) === "null value") {
				throw new AppError("not null constraint", 404)
			}
			return serverError(err)
		}
	}

	async getNumeroPacotesByPedidoId(pedidoId: string): Promise<HttpResponse> {
		try {
			const count = await this.repository
				.createQueryBuilder("pac")
				.select(['COUNT(pac.id) :: float as "count"'])
				.where("pac.pedidoId = :pedidoId", { pedidoId })
				.getRawOne()

			return ok(count)
		} catch (err) {
			return serverError(err)
		}
	}

	async getPacoteColor(): Promise<HttpResponse> {
		try {
			const color = await this.repository.query(`
                    SELECT
                        description
                    FROM
                        configs
                    WHERE
                        title = 'cores'
                `)

			if (!color) {
				return notFound()
			}

			return ok(color)
		} catch (err) {
			return serverError(err)
		}
	}

	async selectPacotesByPedidoId(filter: string, pedidoId: string): Promise<HttpResponse> {
		try {
			const pacotes = await this.repository.query(
				`
                SELECT
                    pac.id as "value",
                    pac.descricao as "label"
                FROM
                    pacotes pac
                WHERE pac.pedido_id = $1
                ORDER BY pac.descricao
            `,
				[pedidoId]
			)
			return ok(pacotes)
		} catch (err) {
			console.log(err)
			return serverError(err)
		}
	}

	async idSelectPacotesByPedidoId(id: string): Promise<HttpResponse> {
		try {
			const pacote = await this.repository.query(
				`
                SELECT
                    pac.id as "value",
                    pac.descricao as "label"
                FROM
                    pacotes pac
                WHERE pac.id = $1
                ORDER BY pac.descricao
            `,
				[id]
			)
			return ok(pacote)
		} catch (err) {
			return serverError(err)
		}
	}
}

export { PacoteRepository }
