import { Brackets, getRepository, Repository } from 'typeorm'
import { IAlturaVaosDTO } from '@modules/configuracao/dtos/i-altura-vaos-dto'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class AlturaVaosRepository implements IAlturaVaosRepository {
  private repository: Repository<AlturaVaos>

  constructor() {
    this.repository = getRepository(AlturaVaos)
  }


  // create
  async create ({
    nome,
    descricao
  }: IAlturaVaosDTO): Promise<HttpResponse> {
    const alturaVaos = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(alturaVaos)
      .then(alturaVaosResult => {
        return ok(alturaVaosResult)
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
      let query = this.repository.createQueryBuilder('alt')
        .select([
          'alt.id as "id"',
          'alt.nome as "nome"',
          'alt.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const alturasVaos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(alt.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(alt.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('alt.nome', columnOrder[0])
        .addOrderBy('alt.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(alturasVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const alturasVaos = await this.repository.createQueryBuilder('alt')
        .select([
          'alt.id as "value"',
          'alt.medida as "label"',
        ])
        .where('alt.medida ilike :filter', { filter: `${filter}%` })
        .addOrderBy('alt.medida')
        .getRawMany()

      return ok(alturasVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const alturaVaos = await this.repository.createQueryBuilder('alt')
        .select([
          'alt.id as "value"',
          'alt.medida as "label"',
        ])
        .where('alt.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(alturaVaos)
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
      let query = this.repository.createQueryBuilder('alt')
        .select([
          'alt.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const alturasVaos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(alt.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(alt.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: alturasVaos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const alturaVaos = await this.repository.createQueryBuilder('alt')
        .select([
          'alt.id as "id"',
          'alt.nome as "nome"',
          'alt.descricao as "descricao"',
        ])
        .where('alt.id = :id', { id })
        .getRawOne()

      if (typeof alturaVaos === 'undefined') {
        return noContent()
      }

      return ok(alturaVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IAlturaVaosDTO): Promise<HttpResponse> {
    const alturaVaos = await this.repository.findOne(id)

    if (!alturaVaos) {
      return notFound()
    }

    const newalturaVaos = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newalturaVaos)

      return ok(newalturaVaos)
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

export { AlturaVaosRepository }
