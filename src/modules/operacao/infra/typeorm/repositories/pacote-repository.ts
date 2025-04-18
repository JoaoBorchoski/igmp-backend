import { Brackets, getRepository, Repository } from 'typeorm'
import { IPacoteDTO } from '@modules/operacao/dtos/i-pacote-dto'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PacoteRepository implements IPacoteRepository {
  private repository: Repository<Pacote>

  constructor() {
    this.repository = getRepository(Pacote)
  }


  // create
  async create ({
    pedidoId,
    descricao
  }: IPacoteDTO): Promise<HttpResponse> {
    const pacote = this.repository.create({
      pedidoId,
      descricao
    })

    const result = await this.repository.save(pacote)
      .then(pacoteResult => {
        return ok(pacoteResult)
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
      "pedidoSequencial",
      "descricao",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "id"',
          'a.id as "pedidoId"',
          'a.sequencial as "pedidoSequencial"',
          'pac.descricao as "descricao"',
        ])
        .leftJoin('pac.pedidoId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const pacotes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.sequencial AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pac.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.sequencial', columnOrder[0])
        .addOrderBy('pac.descricao', columnOrder[1])
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
  async select (filter: string): Promise<HttpResponse> {
    try {
      const pacotes = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "value"',
          'pac.id as "label"',
        ])
        .where('pac.id ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pac.id')
        .getRawMany()

      return ok(pacotes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const pacote = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "value"',
          'pac.id as "label"',
        ])
        .where('pac.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(pacote)
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
        .leftJoin('pac.pedidoId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const pacotes = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.sequencial AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pac.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: pacotes.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const pacote = await this.repository.createQueryBuilder('pac')
        .select([
          'pac.id as "id"',
          'pac.pedidoId as "pedidoId"',
          'a.sequencial as "pedidoSequencial"',
          'pac.descricao as "descricao"',
        ])
        .leftJoin('pac.pedidoId', 'a')
        .where('pac.id = :id', { id })
        .getRawOne()

      if (typeof pacote === 'undefined') {
        return noContent()
      }

      return ok(pacote)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    pedidoId,
    descricao
  }: IPacoteDTO): Promise<HttpResponse> {
    const pacote = await this.repository.findOne(id)

    if (!pacote) {
      return notFound()
    }

    const newpacote = this.repository.create({
      id,
      pedidoId,
      descricao
    })

    try {
      await this.repository.save(newpacote)

      return ok(newpacote)
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

export { PacoteRepository }
