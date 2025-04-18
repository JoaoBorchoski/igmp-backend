import { IProfileDTO } from '@modules/security/dtos/i-profile-dto'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ProfileRepositoryInMemory implements IProfileRepository {
  profiles: Profile[] = []

  // create
  async create ({
    userGroupId,
    name,
    disabled
  }: IProfileDTO): Promise<HttpResponse> {
    const profile = new Profile()

    Object.assign(profile, {
      userGroupId,
      name,
      disabled
    })

    this.profiles.push(profile)

    return ok(profile)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredProfiles = this.profiles

    filteredProfiles = filteredProfiles.filter((profile) => {
      if (profile.userGroupId.includes(search)) return true
      if (profile.name.includes(search)) return true

      return false
    })

    return ok(filteredProfiles.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredProfiles = this.profiles

    filteredProfiles = filteredProfiles.filter((profile) => {
      if (profile.userGroupId.includes(filter)) return true
      if (profile.name.includes(filter)) return true

      return false
    })

    return ok(filteredProfiles)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredProfiles = this.profiles

    filteredProfiles = filteredProfiles.filter((profile) => {
      if (profile.userGroupId.includes(search)) return true
      if (profile.name.includes(search)) return true

      return false
    })

    return ok(filteredProfiles.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const profile = this.profiles.find((profile) => profile.id === id)

    if (typeof profile === 'undefined') {
      return notFound()
    } else {
      return ok(profile)
    }
  }


  // update
  async update ({
    id,
    userGroupId,
    name,
    disabled
  }: IProfileDTO): Promise<HttpResponse> {
    const index = this.profiles.findIndex((profile) => profile.id === id)

    this.profiles[index].userGroupId = userGroupId
    this.profiles[index].name = name
    this.profiles[index].disabled = disabled

    return ok(this.profiles[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.profiles.findIndex((profile) => profile.id === id)

    this.profiles.splice(index, 1)

    return ok(this.profiles)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ProfileRepositoryInMemory }
