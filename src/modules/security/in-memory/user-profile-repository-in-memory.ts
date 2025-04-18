import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class UserProfileRepositoryInMemory implements IUserProfileRepository {
  usersProfiles: UserProfile[] = []

  // create
  async create ({
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const userProfile = new UserProfile()

    Object.assign(userProfile, {
      userId,
      profileId
    })

    this.usersProfiles.push(userProfile)

    return ok(userProfile)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredUsersProfiles = this.usersProfiles

    filteredUsersProfiles = filteredUsersProfiles.filter((userProfile) => {
      if (userProfile.userId.includes(search)) return true
      if (userProfile.profileId.includes(search)) return true

      return false
    })

    return ok(filteredUsersProfiles.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredUsersProfiles = this.usersProfiles

    filteredUsersProfiles = filteredUsersProfiles.filter((userProfile) => {
      if (userProfile.userId.includes(filter)) return true
      if (userProfile.profileId.includes(filter)) return true

      return false
    })

    return ok(filteredUsersProfiles)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredUsersProfiles = this.usersProfiles

    filteredUsersProfiles = filteredUsersProfiles.filter((userProfile) => {
      if (userProfile.userId.includes(search)) return true
      if (userProfile.profileId.includes(search)) return true

      return false
    })

    return ok(filteredUsersProfiles.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const userProfile = this.usersProfiles.find((userProfile) => userProfile.id === id)

    if (typeof userProfile === 'undefined') {
      return notFound()
    } else {
      return ok(userProfile)
    }
  }


  // update
  async update ({
    id,
    userId,
    profileId
  }: IUserProfileDTO): Promise<HttpResponse> {
    const index = this.usersProfiles.findIndex((userProfile) => userProfile.id === id)

    this.usersProfiles[index].userId = userId
    this.usersProfiles[index].profileId = profileId

    return ok(this.usersProfiles[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.usersProfiles.findIndex((userProfile) => userProfile.id === id)

    this.usersProfiles.splice(index, 1)

    return ok(this.usersProfiles)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { UserProfileRepositoryInMemory }
