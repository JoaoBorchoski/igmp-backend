import { getRepository, Repository, getManager } from 'typeorm'
import { IProfileDTO } from '@modules/security/dtos/i-profile-dto'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { ProfileOption } from '../entities/profile-option'
import { MenuOption } from '../entities/menu-option'
import { AppError } from '@shared/errors/app-error'

class ProfileRepository implements IProfileRepository {
  private repository: Repository<Profile>
  private profileOptionRepository: Repository<ProfileOption>
  private menuOptionRepository: Repository<MenuOption>

  constructor() {
    this.repository = getRepository(Profile)
    this.profileOptionRepository = getRepository(ProfileOption)
    this.menuOptionRepository = getRepository(MenuOption)
  }


  // create
  async create ({
    userGroupId,
    name,
    disabled,
    menuOptions
  }: IProfileDTO): Promise<HttpResponse> {
    try {
      // profile

      const profile = this.repository.create({
        userGroupId,
        name,
        disabled
      })

      const result = await this.repository.save(profile)
        .then(async profileResult => {
          
          // menu options and rights

          for (let i = 0; i < menuOptions.length; i = i + 1) {
            const newProfileOption = this.profileOptionRepository.create({
              profileId: profileResult.id,
              menuOptionKey: menuOptions[i].menuOptionKey,
              permitAll: menuOptions[i].permitAll,
              permitCreate: menuOptions[i].permitCreate,
              permitRestore: menuOptions[i].permitRestore,
              permitUpdate: menuOptions[i].permitUpdate,
              permitDelete: menuOptions[i].permitDelete,
              disabled: menuOptions[i].disabled
            })

            await this.profileOptionRepository.save(newProfileOption)
          }

          const newProfileResult = {
            id: profileResult.id,
            name: profileResult.name,
            disabled: profileResult.disabled,
            userGroupId: profileResult.userGroupId,
            createdAt: profileResult.createdAt,
            updatedAt: profileResult.updatedAt,
            menuOptions: menuOptions
          }

          return newProfileResult
        })
        .catch(error => {
          throw error
        })

      return ok(result)
    } catch (e) {
      return serverError(e)
    }
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
      "userGroupName",
      "name"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let profiles = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
          'use.id as "userGroupId"',
          'use.name as "userGroupName"',
          'pro.name as "name"',
        ])
        .leftJoin('pro.userGroupId', 'use')
        .where('use.name ilike :search', { search: `%${search}%` })
        .orWhere('pro.name ilike :search', { search: `%${search}%` })
        .addOrderBy('use.name', columnOrder[0])
        .addOrderBy('pro.name', columnOrder[1])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (profiles.length > rowsPerPage) {
        profiles = profiles.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(profiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const profiles = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "value"',
          'pro.name as "label"',
        ])
        .where('pro.name ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pro.name')
        .getRawMany()

      return ok(profiles)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const profile = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "value"',
          'pro.name as "label"',
        ])
        .where('pro.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(profile)
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
      const profiles = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
        ])
        .leftJoin('pro.userGroupId', 'use')
        .where('use.name ilike :search', { search: `%${search}%` })
        .orWhere('pro.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: profiles.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const manager = getManager();

      let profile = await this.repository.createQueryBuilder('pro')
        .select([
          'pro.id as "id"',
          'pro.userGroupId as "userGroupId"',
          'pro.name as "name"',
          'pro.disabled as "disabled"'
        ])
        .where('pro.id = :id', { id: `${id}` })
        .getRawOne()

      let profileOptions = await manager.query(`
        select distinct
          men.id as "id",
          mod.id as "moduleId",
          mod.name as "moduleName",
          men.sequence as "sequence",
          men.label as "label",
          men.route as "route",
          men.key as "key",
          pro.permit_all as "permitAll",
          pro.permit_create as "permitCreate",
          pro.permit_restore as "permitRestore",
          pro.permit_update as "permitUpdate",
          pro.permit_delete as "permitDelete",
          pro.disabled as "disabled"

        from menu_options as men
          left outer join modules as mod
            on men.module_id = mod.id
          left outer join profile_options as pro
                on men.key = pro.menu_option_key
                and pro.profile_id = '${id}'

        order by  mod.name
        ,         men.sequence 
      `)

      profile.menuOptions = profileOptions

      return ok(profile)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userGroupId,
    name,
    disabled,
    menuOptions
  }: IProfileDTO): Promise<HttpResponse> {
    const profile = await this.repository.findOne(id)

    if (!profile) {
      return notFound()
    }

    const newprofile = this.repository.create({
      id,
      userGroupId,
      name,
      disabled
    })

    try {
      this.profileOptionRepository.delete({ profileId: id })

      const result = await this.repository.save(newprofile)
        .then(async profileResult => {
          
          // menu options and rights

          for (let i = 0; i < menuOptions.length; i = i + 1) {
            const newProfileOption = this.profileOptionRepository.create({
              profileId: profileResult.id,
              menuOptionKey: menuOptions[i].menuOptionKey,
              permitAll: menuOptions[i].permitAll,
              permitCreate: menuOptions[i].permitCreate,
              permitRestore: menuOptions[i].permitRestore,
              permitUpdate: menuOptions[i].permitUpdate,
              permitDelete: menuOptions[i].permitDelete,
              disabled: menuOptions[i].disabled
            })

            await this.profileOptionRepository.save(newProfileOption)
          }

          const newProfileResult = {
            id: profileResult.id,
            name: profileResult.name,
            disabled: profileResult.disabled,
            userGroupId: profileResult.userGroupId,
            createdAt: profileResult.createdAt,
            updatedAt: profileResult.updatedAt,
            menuOptions: menuOptions
          }

          return newProfileResult
        })
        .catch(error => {
          throw error
        })

      return ok(result)
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

export { ProfileRepository }
