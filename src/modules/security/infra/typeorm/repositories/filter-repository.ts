import { getRepository, Repository } from 'typeorm'
import { IFilterDTO } from '@modules/security/dtos/i-filter-dto'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { Filter } from '@modules/security/infra/typeorm/entities/filter'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class FilterRepository implements IFilterRepository {
  private repository: Repository<Filter>

  constructor() {
    this.repository = getRepository(Filter)
  }


  // create
  async create ({
    name,
    expression,
    table,
    userId
  }: IFilterDTO): Promise<HttpResponse> {
    const filter = this.repository.create({
      name,
      expression,
      table,
      userId
    })

    const result = await this.repository.save(filter)
      .then(filterResult => {
        return ok(filterResult)
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
    order: string
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
      "user",
      "name"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let filters = await this.repository.createQueryBuilder('fil')
        .select([
          'fil.id as "id"',
          'fil.name as "name"',
          'fil.table as "table"',
          'fil.expression as "expression"',
          'use.id as "userId"',
          'use.name as "user"'
        ])
        .innerJoin('users', 'use', 'fil.userId = use.id')
        .where('fil.name ilike :search', { search: `%${search}%` })
        .andWhere('use.name ilike :search', { search: `%${search}%` })
        .addOrderBy('use.name', columnOrder[0])
        .addOrderBy('fil.name', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (filters.length > rowsPerPage) {
        filters = filters.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(filters)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (table: string, user: User): Promise<HttpResponse> {
    try {
      const filters = await this.repository.createQueryBuilder('fil')
        .select([
          'fil.id as "value"',
          'fil.name as "label"',
          'fil.expression as "expression"',
        ])
        .innerJoin('users', 'use', 'fil.userId = use.id')
        .where('fil.table = :table', { table })
        .andWhere('use.id = :userId', { userId: user.id })
        .addOrderBy('fil.name')
        .getRawMany()

      return ok(filters)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const filter = await this.repository.createQueryBuilder('fil')
        .select([
          'fil.id as "value"',
          'fil.name as "label"'
        ])
        .where('fil.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(filter)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    try {
      const filters = await this.repository.createQueryBuilder('fil')
        .select([
          'fil.id as "id"',
        ])
        .innerJoin('users', 'use', 'fil.userId = use.id')
        .where('fil.name ilike :search', { search: `%${search}%` })
        .andWhere('use.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: filters.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const filter = await this.repository.findOne(id)

      if (typeof filter === 'undefined') {
        return noContent()
      }

      return ok(filter)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    expression,
    table,
    userId
  }: IFilterDTO): Promise<HttpResponse> {
    const filter = await this.repository.findOne(id)

    if (!filter) {
      return notFound()
    }

    const newfilter = this.repository.create({
      id,
      name,
      expression,
      table,
      userId
    })

    try {
      await this.repository.save(newfilter)

      return ok(newfilter)
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

export { FilterRepository }
