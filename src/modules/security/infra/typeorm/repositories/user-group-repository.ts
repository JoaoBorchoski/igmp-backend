import { getRepository, Repository } from 'typeorm'
import { IUserGroupDTO } from '@modules/security/dtos/i-user-group-dto'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class UserGroupRepository implements IUserGroupRepository {
  private repository: Repository<UserGroup>

  constructor() {
    this.repository = getRepository(UserGroup)
  }


  // create
  async create ({
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const userGroup = this.repository.create({
      name,
      disabled
    })

    const result = await this.repository.save(userGroup)
      .then(userGroupResult => {
        return ok(userGroupResult)
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
    filter?: string
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
      "name"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'use.name as "name"',
        ])
        .where('use.name ilike :search', { search: `%${search}%` })
        .addOrderBy('use.name', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (userGroups.length > rowsPerPage) {
        userGroups = userGroups.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(userGroups)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "value"',
          'use.name as "label"',
        ])
        .where('use.name ilike :filter', { filter: `${filter}%` })
        .addOrderBy('use.name')
        .getRawMany()

      return ok(userGroups)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const userGroup = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "value"',
          'use.name as "label"',
        ])
        .where('use.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(userGroup)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter?: string
  ): Promise<HttpResponse> {
    try {
      const userGroups = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .where('use.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: userGroups.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const userGroup = await this.repository.findOne(id)

      if (typeof userGroup === 'undefined') {
        return noContent()
      }

      return ok(userGroup)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const userGroup = await this.repository.findOne(id)

    if (!userGroup) {
      return notFound()
    }

    const newuserGroup = this.repository.create({
      id,
      name,
      disabled
    })

    try {
      await this.repository.save(newuserGroup)

      return ok(newuserGroup)
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

export { UserGroupRepository }
