import { Brackets, getRepository, Repository } from 'typeorm'
import { ISentidoAberturaDTO } from '@modules/configuracao/dtos/i-sentido-abertura-dto'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { SentidoAbertura } from '@modules/configuracao/infra/typeorm/entities/sentido-abertura'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class SentidoAberturaRepository implements ISentidoAberturaRepository {
  private repository: Repository<SentidoAbertura>

  constructor() {
    this.repository = getRepository(SentidoAbertura)
  }


  // create
  async create ({
    nome,
    descricao
  }: ISentidoAberturaDTO): Promise<HttpResponse> {
    const sentidoAbertura = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(sentidoAbertura)
      .then(sentidoAberturaResult => {
        return ok(sentidoAberturaResult)
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
      let query = this.repository.createQueryBuilder('sen')
        .select([
          'sen.id as "id"',
          'sen.nome as "nome"',
          'sen.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const sentidosAbertura = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sen.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sen.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('sen.nome', columnOrder[0])
        .addOrderBy('sen.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(sentidosAbertura)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const sentidosAbertura = await this.repository.createQueryBuilder('sen')
        .select([
          'sen.id as "value"',
          'sen.descricao as "label"',
        ])
        .where('sen.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sen.descricao')
        .getRawMany()

      return ok(sentidosAbertura)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const sentidoAbertura = await this.repository.createQueryBuilder('sen')
        .select([
          'sen.id as "value"',
          'sen.descricao as "label"',
        ])
        .where('sen.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(sentidoAbertura)
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
      let query = this.repository.createQueryBuilder('sen')
        .select([
          'sen.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const sentidosAbertura = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sen.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sen.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: sentidosAbertura.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const sentidoAbertura = await this.repository.createQueryBuilder('sen')
        .select([
          'sen.id as "id"',
          'sen.nome as "nome"',
          'sen.descricao as "descricao"',
        ])
        .where('sen.id = :id', { id })
        .getRawOne()

      if (typeof sentidoAbertura === 'undefined') {
        return noContent()
      }

      return ok(sentidoAbertura)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ISentidoAberturaDTO): Promise<HttpResponse> {
    const sentidoAbertura = await this.repository.findOne(id)

    if (!sentidoAbertura) {
      return notFound()
    }

    const newsentidoAbertura = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newsentidoAbertura)

      return ok(newsentidoAbertura)
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

export { SentidoAberturaRepository }
