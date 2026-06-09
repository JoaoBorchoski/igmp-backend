import { Brackets, EntityManager, getRepository, Repository } from 'typeorm'
import { IEspelhoCargaItemsDTO } from '@modules/operacao/dtos/i-espelho-carga-items-dto'
import { IEspelhoCargaItemsRepository } from '@modules/operacao/repositories/i-espelho-carga-items-repository'
import { EspelhoCargaItems } from '@modules/operacao/infra/typeorm/entities/espelho-carga-items'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class EspelhoCargaItemsRepository implements IEspelhoCargaItemsRepository {
	private repository: Repository<EspelhoCargaItems>

	constructor() {
		this.repository = getRepository(EspelhoCargaItems)
	}

	// create
	async create({ espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO): Promise<HttpResponse> {
		const espelhoCargaItems = this.repository.create({
			espelhoCargaId,
			pacoteItemId,
			quantidade,
		})

		const result = await this.repository
			.save(espelhoCargaItems)
			.then((espelhoCargaItemsResult) => {
				return ok(espelhoCargaItemsResult)
			})
			.catch((error) => {
				return serverError(error)
			})

		return result
	}

	async createWithQueryRunner({ espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO, transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			if (!transactionManager.queryRunner || !transactionManager.queryRunner.isTransactionActive) {
				console.log('ERRO: Transação não está mais ativa ao tentar criar espelho_carga_items!')
				return serverError(new Error('Transação não está mais ativa'))
			}

			if (!espelhoCargaId) {
				throw new Error('espelhoCargaId é obrigatório')
			}

			if (!pacoteItemId) {
				throw new Error('pacoteItemId é obrigatório')
			}

			const espelhoCargaItems = transactionManager.create(EspelhoCargaItems, {
				espelhoCargaId,
				pacoteItemId,
				quantidade,
			})

			const result = await transactionManager
				.save(espelhoCargaItems)
				.then((espelhoCargaItemsResult) => {
					return ok(espelhoCargaItemsResult)
				})
				.catch((error) => {
					console.log('Erro ao salvar espelho_carga_items:', error)
					return serverError(error)
				})

			return result
		} catch (error) {
			console.log('Erro geral na criação do espelho_carga_items:', error)
			return serverError(error)
		}
	}

	// list
	async list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
		let columnName: string
		let columnDirection: 'ASC' | 'DESC'

		if (typeof order === 'undefined' || order === '') {
			columnName = 'quantidade'
			columnDirection = 'ASC'
		} else {
			columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
			columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
		}

		const referenceArray = ['quantidade', 'espelhoCargaPlaca']
		const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

		const index = referenceArray.indexOf(columnName)

		columnOrder[index] = columnDirection

		const offset = rowsPerPage * page

		try {
			let query = this.repository
				.createQueryBuilder('eci')
				.select([
					'eci.id as "id"',
					'eci.espelhoCargaId as "espelhoCargaId"',
					'ec.placa as "espelhoCargaPlaca"',
					'eci.pacoteItemId as "pacoteItemId"',
					'eci.quantidade as "quantidade"',
				])
				.leftJoin('eci.espelhoCargaId', 'ec')

			if (filter) {
				query = query.where(filter)
			}

			const espelhosCargaItems = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere('CAST(eci.quantidade AS VARCHAR) ilike :search', { search: `%${search}%` })
						query.orWhere('CAST(ec.placa AS VARCHAR) ilike :search', { search: `%${search}%` })
					}),
				)
				.addOrderBy('eci.quantidade', columnOrder[0])
				.addOrderBy('ec.placa', columnOrder[1])
				.offset(offset)
				.limit(rowsPerPage)
				.take(rowsPerPage)
				.getRawMany()

			return ok(espelhosCargaItems)
		} catch (err) {
			return serverError(err)
		}
	}

	// select
	async select(filter: string): Promise<HttpResponse> {
		try {
			const espelhosCargaItems = await this.repository
				.createQueryBuilder('eci')
				.select(['eci.id as "value"', 'eci.espelhoCargaId as "label"'])
				.addOrderBy('eci.espelhoCargaId')
				.getRawMany()

			return ok(espelhosCargaItems)
		} catch (err) {
			console.log('Error in select:', err)
			return serverError(err)
		}
	}

	async selectByEspelhoCargaId(filter: string, espelhoCargaId: string): Promise<HttpResponse> {
		try {
			let query = this.repository
				.createQueryBuilder('eci')
				.select(['eci.id as "value"', 'CONCAT(pi.produto, \' - Qtd: \', eci.quantidade) as "label"'])
				.leftJoin('pacotes_items', 'pi', 'pi.id :: varchar = eci.pacoteItemId')
				.leftJoin('eci.espelhoCargaId', 'ec')
				.where('eci.espelhoCargaId = :espelhoCargaId', { espelhoCargaId })

			if (filter) {
				query = query.andWhere('pi.produto ilike :filter', { filter: `${filter}%` })
			}

			const espelhosCargaItems = await query.addOrderBy('eci.espelhoCargaId').getRawMany()

			return ok(espelhosCargaItems)
		} catch (err) {
			console.log('Error in selectByEspelhoCargaId:', err)
			return serverError(err)
		}
	}

	// id select
	async idSelect(id: string): Promise<HttpResponse> {
		try {
			const espelhoCargaItems = await this.repository
				.createQueryBuilder('eci')
				.select(['eci.id as "value"', 'CONCAT(ec.placa, \' - Qtd: \', eci.quantidade) as "label"'])
				.leftJoin('eci.espelhoCargaId', 'ec')
				.where('eci.id = :id', { id: `${id}` })
				.getRawOne()

			return ok(espelhoCargaItems)
		} catch (err) {
			console.log('Error in idSelect:', err)
			return serverError(err)
		}
	}

	// count
	async count(search: string, filter: string): Promise<HttpResponse> {
		try {
			let query = this.repository.createQueryBuilder('eci').select(['eci.id as "id"']).leftJoin('eci.espelhoCargaId', 'ec')

			if (filter) {
				query = query.where(filter)
			}

			const espelhosCargaItems = await query
				.andWhere(
					new Brackets((query) => {
						query.andWhere('CAST(eci.quantidade AS VARCHAR) ilike :search', { search: `%${search}%` })
						query.orWhere('CAST(ec.placa AS VARCHAR) ilike :search', { search: `%${search}%` })
					}),
				)
				.getRawMany()

			return ok({ count: espelhosCargaItems.length })
		} catch (err) {
			return serverError(err)
		}
	}

	// get
	async get(id: string): Promise<HttpResponse> {
		try {
			const espelhoCargaItems = await this.repository
				.createQueryBuilder('eci')
				.select([
					'eci.id as "id"',
					'eci.espelhoCargaId as "espelhoCargaId"',
					'ec.placa as "espelhoCargaPlaca"',
					'eci.pacoteItemId as "pacoteItemId"',
					'eci.quantidade as "quantidade"',
				])
				.leftJoin('eci.espelhoCargaId', 'ec')
				.where('eci.id = :id', { id })
				.getRawOne()

			if (typeof espelhoCargaItems === 'undefined') {
				return noContent()
			}

			return ok(espelhoCargaItems)
		} catch (err) {
			return serverError(err)
		}
	}

	async getByEspelhoCargaId(espelhoCargaId: string): Promise<HttpResponse> {
		try {
			const espelhosCargaItems = await this.repository
				.createQueryBuilder('eci')
				.select([
					'eci.id as "id"',
					'eci.espelhoCargaId as "espelhoCargaId"',
					'ec.placa as "espelhoCargaPlaca"',
					'eci.pacoteItemId as "pacoteItemId"',
					'eci.quantidade as "quantidade"',
				])
				.leftJoin('eci.espelhoCargaId', 'ec')
				.where('eci.espelhoCargaId = :espelhoCargaId', { espelhoCargaId })
				.getRawMany()

			return ok(espelhosCargaItems)
		} catch (err) {
			return serverError(err)
		}
	}

	async getByPacoteItemId(pacoteId: string): Promise<HttpResponse> {
		try {
			const espelhoCargaItems = await this.repository
				.createQueryBuilder('eci')
				.select(['eci.id as "id"'])
				.leftJoin('eci.pacoteItemId', 'pi')
				.leftJoin('pi.pacoteId', 'p')
				.where('p.id = :pacoteId', { pacoteId })
				.getRawOne()

			if (typeof espelhoCargaItems === 'undefined') {
				return noContent()
			}

			return ok(espelhoCargaItems)
		} catch (error) {
			return serverError(error)
		}
	}

	// update
	async update({ id, espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO): Promise<HttpResponse> {
		const espelhoCargaItems = await this.repository.findOne(id)

		if (!espelhoCargaItems) {
			return notFound()
		}

		const newEspelhoCargaItems = this.repository.create({
			id,
			espelhoCargaId,
			pacoteItemId,
			quantidade,
		})

		try {
			await this.repository.save(newEspelhoCargaItems)

			return ok(newEspelhoCargaItems)
		} catch (err) {
			return serverError(err)
		}
	}

	async updateWithQueryRunner({ id, espelhoCargaId, pacoteItemId, quantidade }: IEspelhoCargaItemsDTO, transactionManager: EntityManager): Promise<HttpResponse> {
		const espelhoCargaItems = await transactionManager.findOne(EspelhoCargaItems, id)

		if (!espelhoCargaItems) {
			return notFound()
		}

		const newEspelhoCargaItems = transactionManager.create(EspelhoCargaItems, {
			id,
			espelhoCargaId,
			pacoteItemId,
			quantidade,
		})

		try {
			await transactionManager.save(EspelhoCargaItems, newEspelhoCargaItems)

			return ok(newEspelhoCargaItems)
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
			if (err.message.slice(0, 10) === 'null value') {
				throw new AppError('not null constraint', 404)
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
			if (err.message.slice(0, 10) === 'null value') {
				throw new AppError('not null constraint', 404)
			}

			return serverError(err)
		}
	}

	async deleteWithQueryRunner(ids: string[], transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			await transactionManager.delete(EspelhoCargaItems, ids)

			return noContent()
		} catch (err) {
			if (err.message.slice(0, 10) === 'null value') {
				throw new AppError('not null constraint', 404)
			}

			return serverError(err)
		}
	}

	async deleteByEspelhoCargaIdWithQueryRunner(espelhoCargaId: string, transactionManager: EntityManager): Promise<HttpResponse> {
		try {
			await transactionManager.delete(EspelhoCargaItems, { espelhoCargaId: espelhoCargaId })

			return noContent()
		} catch (err) {
			return serverError(err)
		}
	}
}

export { EspelhoCargaItemsRepository }
