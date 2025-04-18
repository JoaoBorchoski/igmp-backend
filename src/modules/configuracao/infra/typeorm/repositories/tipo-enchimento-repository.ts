import { Brackets, getRepository, Repository } from 'typeorm'
import { ITipoEnchimentoDTO } from '@modules/configuracao/dtos/i-tipo-enchimento-dto'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class TipoEnchimentoRepository implements ITipoEnchimentoRepository {
  private repository: Repository<TipoEnchimento>

  constructor() {
    this.repository = getRepository(TipoEnchimento)
  }


  // create
  async create ({
    nome,
    descricao
  }: ITipoEnchimentoDTO): Promise<HttpResponse> {
    const tipoEnchimento = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(tipoEnchimento)
      .then(tipoEnchimentoResult => {
        return ok(tipoEnchimentoResult)
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
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.nome as "nome"',
          'tip.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposEnchimento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('tip.nome', columnOrder[0])
        .addOrderBy('tip.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(tiposEnchimento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const tiposEnchimento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      return ok(tiposEnchimento)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const tipoEnchimento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "value"',
          'tip.descricao as "label"',
        ])
        .where('tip.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(tipoEnchimento)
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
      let query = this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const tiposEnchimento = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(tip.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(tip.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: tiposEnchimento.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const tipoEnchimento = await this.repository.createQueryBuilder('tip')
        .select([
          'tip.id as "id"',
          'tip.nome as "nome"',
          'tip.descricao as "descricao"',
        ])
        .where('tip.id = :id', { id })
        .getRawOne()

      if (typeof tipoEnchimento === 'undefined') {
        return noContent()
      }

      return ok(tipoEnchimento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ITipoEnchimentoDTO): Promise<HttpResponse> {
    const tipoEnchimento = await this.repository.findOne(id)

    if (!tipoEnchimento) {
      return notFound()
    }

    const newtipoEnchimento = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newtipoEnchimento)

      return ok(newtipoEnchimento)
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

export { TipoEnchimentoRepository }
