import { Brackets, getRepository, Repository } from 'typeorm'
import { IPacoteItemDTO } from '@modules/operacao/dtos/i-pacote-item-dto'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PacoteItemRepository implements IPacoteItemRepository {
  private repository: Repository<PacoteItem>

  constructor() {
    this.repository = getRepository(PacoteItem)
  }


  // create
  async create ({
    pacoteId,
    produto,
    quantidade
  }: IPacoteItemDTO): Promise<HttpResponse> {
    const pacoteItem = this.repository.create({
      pacoteId,
      produto,
      quantidade
    })

    const result = await this.repository.save(pacoteItem)
      .then(pacoteItemResult => {
        return ok(pacoteItemResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "pacoteId",
      "quantidade",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "id"',
          'a.id as "pacoteId"',
          'a.id as "pacoteId"',
          'pac.quantidade as "quantidade"',
        ])
        .leftJoin('pac.pacoteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const pacotesItems = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.id AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.id', columnOrder[0])
        .addOrderBy('pac.quantidade', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(pacotesItems)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const pacotesItems = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "value"',
          'pac.pacoteId as "label"',
        ])
        .where('pac.pacoteId ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pac.pacoteId')
        .getRawMany()

      return ok(pacotesItems)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const pacoteItem = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "value"',
          'pac.pacoteId as "label"',
        ])
        .where('pac.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(pacoteItem)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "id"',
        ])
        .leftJoin('pac.pacoteId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const pacotesItems = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.id AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: pacotesItems.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const pacoteItem = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "id"',
          'pac.pacoteId as "pacoteId"',
          'a.id as "pacoteId"',
          'pac.produto as "produto"',
          'pac.quantidade as "quantidade"',
        ])
        .leftJoin('pac.pacoteId', 'a')
        .where('pac.id = :id', { id })
        .getRawOne()

      if (typeof pacoteItem === 'undefined') {
        return noContent()
      }

      return ok(pacoteItem)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    pacoteId,
    produto,
    quantidade
  }: IPacoteItemDTO): Promise<HttpResponse> {
    const pacoteItem = await this.repository.findOne(id)

    if (!pacoteItem) {
      return notFound()
    }

    const newpacoteItem = this.repository.create({
      id,
      pacoteId,
      produto,
      quantidade
    })

    try {
      await this.repository.save(newpacoteItem)

      return ok(newpacoteItem)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { PacoteItemRepository }
