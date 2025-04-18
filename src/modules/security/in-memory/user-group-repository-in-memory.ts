import { IUserGroupDTO } from '@modules/security/dtos/i-user-group-dto'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class UserGroupRepositoryInMemory implements IUserGroupRepository {
  userGroups: UserGroup[] = []

  // create
  async create ({
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const userGroup = new UserGroup()

    Object.assign(userGroup, {
      name,
      disabled
    })

    this.userGroups.push(userGroup)

    return ok(userGroup)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredUserGroups = this.userGroups

    filteredUserGroups = filteredUserGroups.filter((userGroup) => {
      if (userGroup.name.includes(search)) return true

      return false
    })

    return ok(filteredUserGroups.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredUserGroups = this.userGroups

    filteredUserGroups = filteredUserGroups.filter((userGroup) => {
      if (userGroup.name.includes(filter)) return true

      return false
    })

    return ok(filteredUserGroups)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredUserGroups = this.userGroups

    filteredUserGroups = filteredUserGroups.filter((userGroup) => {
      if (userGroup.name.includes(search)) return true

      return false
    })

    return ok(filteredUserGroups.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const userGroup = this.userGroups.find((userGroup) => userGroup.id === id)

    if (typeof userGroup === 'undefined') {
      return notFound()
    } else {
      return ok(userGroup)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IUserGroupDTO): Promise<HttpResponse> {
    const index = this.userGroups.findIndex((userGroup) => userGroup.id === id)

    this.userGroups[index].name = name
    this.userGroups[index].disabled = disabled

    return ok(this.userGroups[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.userGroups.findIndex((userGroup) => userGroup.id === id)

    this.userGroups.splice(index, 1)

    return ok(this.userGroups)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { UserGroupRepositoryInMemory }
