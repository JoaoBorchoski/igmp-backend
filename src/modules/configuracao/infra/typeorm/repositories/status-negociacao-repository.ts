import { Brackets, getRepository, Repository } from 'typeorm'
import { IStatusNegociacaoDTO } from '@modules/configuracao/dtos/i-status-negociacao-dto'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class StatusNegociacaoRepository implements IStatusNegociacaoRepository {
  private repository: Repository<StatusNegociacao>

  constructor() {
    this.repository = getRepository(StatusNegociacao)
  }


  // create
  async create ({
    nome,
    descricao
  }: IStatusNegociacaoDTO): Promise<HttpResponse> {
    const statusNegociacao = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(statusNegociacao)
      .then(statusNegociacaoResult => {
        return ok(statusNegociacaoResult)
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
      let query = this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.nome as "nome"',
          'sta.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const statusNegociacoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sta.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sta.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('sta.nome', columnOrder[0])
        .addOrderBy('sta.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(statusNegociacoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const statusNegociacoes = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.descricao as "label"',
        ])
        .where('sta.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sta.descricao')
        .getRawMany()

      return ok(statusNegociacoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const statusNegociacao = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.descricao as "label"',
        ])
        .where('sta.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(statusNegociacao)
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
      let query = this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const statusNegociacoes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sta.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sta.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: statusNegociacoes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const statusNegociacao = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.nome as "nome"',
          'sta.descricao as "descricao"',
        ])
        .where('sta.id = :id', { id })
        .getRawOne()

      if (typeof statusNegociacao === 'undefined') {
        return noContent()
      }

      return ok(statusNegociacao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IStatusNegociacaoDTO): Promise<HttpResponse> {
    const statusNegociacao = await this.repository.findOne(id)

    if (!statusNegociacao) {
      return notFound()
    }

    const newstatusNegociacao = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newstatusNegociacao)

      return ok(newstatusNegociacao)
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

export { StatusNegociacaoRepository }
