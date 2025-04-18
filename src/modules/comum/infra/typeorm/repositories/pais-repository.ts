import { Brackets, getRepository, Repository } from 'typeorm'
import { IPaisDTO } from '@modules/comum/dtos/i-pais-dto'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PaisRepository implements IPaisRepository {
  private repository: Repository<Pais>

  constructor() {
    this.repository = getRepository(Pais)
  }


  // create
  async create ({
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<HttpResponse> {
    const pais = this.repository.create({
      codigoPais,
      nomePais
    })

    const result = await this.repository.save(pais)
      .then(paisResult => {
        return ok(paisResult)
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
      "codigoPais",
      "nomePais",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "id"',
          'pai.codigoPais as "codigoPais"',
          'pai.nomePais as "nomePais"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const paises = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pai.codigoPais AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pai.nomePais AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('pai.codigoPais', columnOrder[0])
        .addOrderBy('pai.nomePais', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(paises)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const paises = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "value"',
          'pai.nomePais as "label"',
        ])
        .where('pai.nomePais ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pai.nomePais')
        .getRawMany()

      return ok(paises)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const pais = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "value"',
          'pai.nomePais as "label"',
        ])
        .where('pai.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(pais)
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
      let query = this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const paises = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pai.codigoPais AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(pai.nomePais AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: paises.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const pais = await this.repository.createQueryBuilder('pai')
        .select([
          'pai.id as "id"',
          'pai.codigoPais as "codigoPais"',
          'pai.nomePais as "nomePais"',
        ])
        .where('pai.id = :id', { id })
        .getRawOne()

      if (typeof pais === 'undefined') {
        return noContent()
      }

      return ok(pais)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<HttpResponse> {
    const pais = await this.repository.findOne(id)

    if (!pais) {
      return notFound()
    }

    const newpais = this.repository.create({
      id,
      codigoPais,
      nomePais
    })

    try {
      await this.repository.save(newpais)

      return ok(newpais)
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

export { PaisRepository }
