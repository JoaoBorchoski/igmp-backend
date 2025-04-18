import { getRepository, Repository } from 'typeorm'
import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class UserProfileRepository implements IUserProfileRepository {
  private repository: Repository<UserProfile>

  constructor() {
    this.repository = getRepository(UserProfile)
  }


  // create
  async create ({
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const userProfile = this.repository.create({
      userId,
      profileId
    })

    const result = await this.repository.save(userProfile)
      .then(userProfileResult => {
        return ok(userProfileResult)
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
      "userName",
      "profileName"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'us1.id as "userId"',
          'us1.name as "userName"',
          'pro.id as "profileId"',
          'pro.name as "profileName"',
        ])
        .leftJoin('use.userId', 'us1')
        .leftJoin('use.profileId', 'pro')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .addOrderBy('us1.name', columnOrder[0])
        .addOrderBy('pro.name', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (usersProfiles.length > rowsPerPage) {
        usersProfiles = usersProfiles.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(usersProfiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use. as "value"',
          'use. as "label"',
        ])
        .where('use. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('use.')
        .getRawMany()

      return ok(usersProfiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const userProfile = await this.repository.createQueryBuilder('use')
        .select([
          'use. as "value"',
          'use. as "label"',
        ])
        .where('use. = :id', { id: `${id}` })
        .getRawOne()

      return ok(userProfile)
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
      const usersProfiles = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .leftJoin('use.userId', 'us1')
        .leftJoin('use.profileId', 'pro')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: usersProfiles.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const userProfile = await this.repository.findOne(id)

      if (typeof userProfile === 'undefined') {
        return noContent()
      }

      return ok(userProfile)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const userProfile = await this.repository.findOne(id)

    if (!userProfile) {
      return notFound()
    }

    const newuserProfile = this.repository.create({
      id,
      userId,
      profileId
    })

    try {
      await this.repository.save(newuserProfile)

      return ok(newuserProfile)
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

export { UserProfileRepository }
