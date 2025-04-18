import { Brackets, getRepository, Repository } from 'typeorm'
import { IPadraoCorDTO } from '@modules/configuracao/dtos/i-padrao-cor-dto'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PadraoCorRepository implements IPadraoCorRepository {
  private repository: Repository<PadraoCor>

  constructor() {
    this.repository = getRepository(PadraoCor)
  }


  // create
  async create ({
    nome,
    descricao
  }: IPadraoCorDTO): Promise<HttpResponse> {
    const padraoCor = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(padraoCor)
      .then(padraoCorResult => {
        return ok(padraoCorResult)
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
      let query = this.repository.createQueryBuilder('pad')
        .select([
          'pad.id as "id"',
          'pad.nome as "nome"',
          'pad.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const padroesCores = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pad.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pad.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('pad.nome', columnOrder[0])
        .addOrderBy('pad.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(padroesCores)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const padroesCores = await this.repository.createQueryBuilder('pad')
        .select([
          'pad.id as "value"',
          'pad.nome as "label"',
        ])
        .where('pad.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pad.nome')
        .getRawMany()

      return ok(padroesCores)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const padraoCor = await this.repository.createQueryBuilder('pad')
        .select([
          'pad.id as "value"',
          'pad.nome as "label"',
        ])
        .where('pad.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(padraoCor)
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
      let query = this.repository.createQueryBuilder('pad')
        .select([
          'pad.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const padroesCores = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pad.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pad.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: padroesCores.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const padraoCor = await this.repository.createQueryBuilder('pad')
        .select([
          'pad.id as "id"',
          'pad.nome as "nome"',
          'pad.descricao as "descricao"',
        ])
        .where('pad.id = :id', { id })
        .getRawOne()

      if (typeof padraoCor === 'undefined') {
        return noContent()
      }

      return ok(padraoCor)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IPadraoCorDTO): Promise<HttpResponse> {
    const padraoCor = await this.repository.findOne(id)

    if (!padraoCor) {
      return notFound()
    }

    const newpadraoCor = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newpadraoCor)

      return ok(newpadraoCor)
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

export { PadraoCorRepository }
