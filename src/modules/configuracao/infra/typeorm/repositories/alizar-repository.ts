import { Brackets, getRepository, Repository } from 'typeorm'
import { IAlizarDTO } from '@modules/configuracao/dtos/i-alizar-dto'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class AlizarRepository implements IAlizarRepository {
  private repository: Repository<Alizar>

  constructor() {
    this.repository = getRepository(Alizar)
  }


  // create
  async create ({
    nome,
    descricao
  }: IAlizarDTO): Promise<HttpResponse> {
    const alizar = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(alizar)
      .then(alizarResult => {
        return ok(alizarResult)
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
      let query = this.repository.createQueryBuilder('ali')
        .select([
          'ali.id as "id"',
          'ali.nome as "nome"',
          'ali.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const alizares = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ali.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ali.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('ali.nome', columnOrder[0])
        .addOrderBy('ali.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(alizares)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const alizares = await this.repository.createQueryBuilder('ali')
        .select([
          'ali.id as "value"',
          'ali.descricao as "label"',
        ])
        .where('ali.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('ali.descricao')
        .getRawMany()

      return ok(alizares)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const alizar = await this.repository.createQueryBuilder('ali')
        .select([
          'ali.id as "value"',
          'ali.descricao as "label"',
        ])
        .where('ali.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(alizar)
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
      let query = this.repository.createQueryBuilder('ali')
        .select([
          'ali.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const alizares = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(ali.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(ali.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: alizares.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const alizar = await this.repository.createQueryBuilder('ali')
        .select([
          'ali.id as "id"',
          'ali.nome as "nome"',
          'ali.descricao as "descricao"',
        ])
        .where('ali.id = :id', { id })
        .getRawOne()

      if (typeof alizar === 'undefined') {
        return noContent()
      }

      return ok(alizar)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IAlizarDTO): Promise<HttpResponse> {
    const alizar = await this.repository.findOne(id)

    if (!alizar) {
      return notFound()
    }

    const newalizar = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newalizar)

      return ok(newalizar)
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

export { AlizarRepository }
