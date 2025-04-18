import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ProfileOptionRepositoryInMemory implements IProfileOptionRepository {
  profileOptions: ProfileOption[] = []

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
    const profileOption = new ProfileOption()

    Object.assign(profileOption, {
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    this.profileOptions.push(profileOption)

    return ok(profileOption)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredProfileOptions = this.profileOptions

    filteredProfileOptions = filteredProfileOptions.filter((profileOption) => {
      if (profileOption.profileId.includes(search)) return true
      if (profileOption.menuOptionKey.includes(search)) return true

      return false
    })

    return ok(filteredProfileOptions.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredProfileOptions = this.profileOptions

    filteredProfileOptions = filteredProfileOptions.filter((profileOption) => {
      if (profileOption.profileId.includes(filter)) return true
      if (profileOption.menuOptionKey.includes(filter)) return true

      return false
    })

    return ok(filteredProfileOptions)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredProfileOptions = this.profileOptions

    filteredProfileOptions = filteredProfileOptions.filter((profileOption) => {
      if (profileOption.profileId.includes(search)) return true
      if (profileOption.menuOptionKey.includes(search)) return true

      return false
    })

    return ok(filteredProfileOptions.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const profileOption = this.profileOptions.find((profileOption) => profileOption.id === id)

    if (typeof profileOption === 'undefined') {
      return notFound()
    } else {
      return ok(profileOption)
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
    const index = this.profileOptions.findIndex((profileOption) => profileOption.id === id)

    this.profileOptions[index].profileId = profileId
    this.profileOptions[index].menuOptionKey = menuOptionKey
    this.profileOptions[index].permitAll = permitAll
    this.profileOptions[index].permitCreate = permitCreate
    this.profileOptions[index].permitRestore = permitRestore
    this.profileOptions[index].permitUpdate = permitUpdate
    this.profileOptions[index].permitDelete = permitDelete
    this.profileOptions[index].disabled = disabled

    return ok(this.profileOptions[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.profileOptions.findIndex((profileOption) => profileOption.id === id)

    this.profileOptions.splice(index, 1)

    return ok(this.profileOptions)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ProfileOptionRepositoryInMemory }
