import { Brackets, getRepository, Repository } from 'typeorm'
import { ICepDTO } from '@modules/comum/dtos/i-cep-dto'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CepRepository implements ICepRepository {
  private repository: Repository<Cep>

  constructor() {
    this.repository = getRepository(Cep)
  }


  // create
  async create ({
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<HttpResponse> {
    const cep = this.repository.create({
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    })

    const result = await this.repository.save(cep)
      .then(cepResult => {
        return ok(cepResult)
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
      "codigoCep",
      "logradouro",
      "bairro",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "id"',
          'cep.codigoCep as "codigoCep"',
          'cep.logradouro as "logradouro"',
          'cep.bairro as "bairro"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const ceps = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cep.codigoCep AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cep.logradouro AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cep.bairro AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cep.codigoCep', columnOrder[0])
        .addOrderBy('cep.logradouro', columnOrder[1])
        .addOrderBy('cep.bairro', columnOrder[2])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(ceps)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const ceps = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "value"',
          'cep.codigoCep as "label"',
        ])
        .where('cep.codigoCep ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cep.codigoCep')
        .getRawMany()

      return ok(ceps)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const cep = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "value"',
          'cep.codigoCep as "label"',
        ])
        .where('cep.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(cep)
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
      let query = this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const ceps = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cep.codigoCep AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cep.logradouro AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cep.bairro AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: ceps.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const cep = await this.repository.createQueryBuilder('cep')
        .select([
          'cep.id as "id"',
          'cep.codigoCep as "codigoCep"',
          'cep.logradouro as "logradouro"',
          'cep.bairro as "bairro"',
          'cep.estadoId as "estadoId"',
          'a.uf as "estadoUf"',
          'cep.cidadeId as "cidadeId"',
          'b.nomeCidade as "cidadeNomeCidade"',
        ])
        .leftJoin('cep.estadoId', 'a')
        .leftJoin('cep.cidadeId', 'b')
        .where('cep.id = :id', { id })
        .getRawOne()

      if (typeof cep === 'undefined') {
        return noContent()
      }

      return ok(cep)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<HttpResponse> {
    const cep = await this.repository.findOne(id)

    if (!cep) {
      return notFound()
    }

    const newcep = this.repository.create({
      id,
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    })

    try {
      await this.repository.save(newcep)

      return ok(newcep)
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

export { CepRepository }
