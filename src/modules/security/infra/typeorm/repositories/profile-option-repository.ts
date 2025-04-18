import { getRepository, Repository } from 'typeorm'
import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ProfileOptionRepository implements IProfileOptionRepository {
  private repository: Repository<ProfileOption>

  constructor() {
    this.repository = getRepository(ProfileOption)
  }


  // create
  async create ({
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IProfileOptionDTO): Promise<HttpResponse> {
    const profileOption = this.repository.create({
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    const result = await this.repository.save(profileOption)
      .then(profileOptionResult => {
        return ok(profileOptionResult)
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
      "profileName",
      "menuOptionKey"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
          'pr1.id as "profileId"',
          'pr1.name as "profileName"',
          'pro.menuOptionKey as "menuOptionKey"',
        ])
        .leftJoin('pro.profileId', 'pr1')
        .where('pr1.name ilike :search', { search: `%${search}%` })
        .orWhere('pro.menuOptionKey ilike :search', { search: `%${search}%` })
        .addOrderBy('pr1.name', columnOrder[0])
        .addOrderBy('pro.menuOptionKey', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (profileOptions.length > rowsPerPage) {
        profileOptions = profileOptions.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(profileOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro. as "value"',
          'pro. as "label"',
        ])
        .where('pro. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pro.')
        .getRawMany()

      return ok(profileOptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const profileOption = await this.repository.createQueryBuilder('pro')
        .select([
          'pro. as "value"',
          'pro. as "label"',
        ])
        .where('pro. = :id', { id: `${id}` })
        .getRawOne()

      return ok(profileOption)
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
      const profileOptions = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
        ])
        .leftJoin('pro.profileId', 'pr1')
        .where('pr1.name ilike :search', { search: `%${search}%` })
        .orWhere('pro.menuOptionKey ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: profileOptions.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const profileOption = await this.repository.findOne(id)

      if (typeof profileOption === 'undefined') {
        return noContent()
      }

      return ok(profileOption)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IProfileOptionDTO): Promise<HttpResponse> {
    const profileOption = await this.repository.findOne(id)

    if (!profileOption) {
      return notFound()
    }

    const newprofileOption = this.repository.create({
      id,
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    try {
      await this.repository.save(newprofileOption)

      return ok(newprofileOption)
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

export { ProfileOptionRepository }
