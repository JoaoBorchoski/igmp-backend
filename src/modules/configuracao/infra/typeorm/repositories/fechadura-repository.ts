import { Brackets, getRepository, Repository } from 'typeorm'
import { IFechaduraDTO } from '@modules/configuracao/dtos/i-fechadura-dto'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FechaduraRepository implements IFechaduraRepository {
  private repository: Repository<Fechadura>

  constructor() {
    this.repository = getRepository(Fechadura)
  }


  // create
  async create ({
    nome,
    descricao
  }: IFechaduraDTO): Promise<HttpResponse> {
    const fechadura = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(fechadura)
      .then(fechaduraResult => {
        return ok(fechaduraResult)
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
      "nome",
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('fec')
        .select([
          'fec.id as "id"',
          'fec.nome as "nome"',
          'fec.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const fechaduras = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(fec.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fec.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('fec.nome', columnOrder[0])
        .addOrderBy('fec.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(fechaduras)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const fechaduras = await this.repository.createQueryBuilder('fec')
        .select([
          'fec.id as "value"',
          'fec.descricao as "label"',
        ])
        .where('fec.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('fec.descricao')
        .getRawMany()

      return ok(fechaduras)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const fechadura = await this.repository.createQueryBuilder('fec')
        .select([
          'fec.id as "value"',
          'fec.descricao as "label"',
        ])
        .where('fec.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(fechadura)
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
      let query = this.repository.createQueryBuilder('fec')
        .select([
          'fec.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const fechaduras = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(fec.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(fec.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: fechaduras.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const fechadura = await this.repository.createQueryBuilder('fec')
        .select([
          'fec.id as "id"',
          'fec.nome as "nome"',
          'fec.descricao as "descricao"',
        ])
        .where('fec.id = :id', { id })
        .getRawOne()

      if (typeof fechadura === 'undefined') {
        return noContent()
      }

      return ok(fechadura)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IFechaduraDTO): Promise<HttpResponse> {
    const fechadura = await this.repository.findOne(id)

    if (!fechadura) {
      return notFound()
    }

    const newfechadura = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newfechadura)

      return ok(newfechadura)
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

export { FechaduraRepository }
