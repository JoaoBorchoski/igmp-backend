import { Brackets, getRepository, Repository } from 'typeorm'
import { ILarguraVaosDTO } from '@modules/configuracao/dtos/i-largura-vaos-dto'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class LarguraVaosRepository implements ILarguraVaosRepository {
  private repository: Repository<LarguraVaos>

  constructor() {
    this.repository = getRepository(LarguraVaos)
  }


  // create
  async create ({
    nome,
    descricao
  }: ILarguraVaosDTO): Promise<HttpResponse> {
    const larguraVaos = this.repository.create({
      nome,
      descricao
    })

    const result = await this.repository.save(larguraVaos)
      .then(larguraVaosResult => {
        return ok(larguraVaosResult)
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
      let query = this.repository.createQueryBuilder('lar')
        .select([
          'lar.id as "id"',
          'lar.nome as "nome"',
          'lar.descricao as "descricao"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const largurasVaos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(lar.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(lar.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('lar.nome', columnOrder[0])
        .addOrderBy('lar.descricao', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(largurasVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const largurasVaos = await this.repository.createQueryBuilder('lar')
        .select([
          'lar.id as "value"',
          'lar.medida as "label"',
        ])
        .where('lar.medida ilike :filter', { filter: `${filter}%` })
        .addOrderBy('lar.medida')
        .getRawMany()

      return ok(largurasVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const larguraVaos = await this.repository.createQueryBuilder('lar')
        .select([
          'lar.id as "value"',
          'lar.medida as "label"',
        ])
        .where('lar.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(larguraVaos)
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
      let query = this.repository.createQueryBuilder('lar')
        .select([
          'lar.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const largurasVaos = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(lar.nome AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(lar.descricao AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: largurasVaos.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const larguraVaos = await this.repository.createQueryBuilder('lar')
        .select([
          'lar.id as "id"',
          'lar.nome as "nome"',
          'lar.descricao as "descricao"',
        ])
        .where('lar.id = :id', { id })
        .getRawOne()

      if (typeof larguraVaos === 'undefined') {
        return noContent()
      }

      return ok(larguraVaos)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ILarguraVaosDTO): Promise<HttpResponse> {
    const larguraVaos = await this.repository.findOne(id)

    if (!larguraVaos) {
      return notFound()
    }

    const newlarguraVaos = this.repository.create({
      id,
      nome,
      descricao
    })

    try {
      await this.repository.save(newlarguraVaos)

      return ok(newlarguraVaos)
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

export { LarguraVaosRepository }
