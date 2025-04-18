import { IUserDTO } from '@modules/security/dtos/i-user-dto'
import { IUserRepository } from '@modules/security/repositories/i-user-repository'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = []

  // create
  async create ({
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    avatar,
    disabled
  }: IUserDTO): Promise<HttpResponse> {
    const user = new User()

    Object.assign(user, {
      userGroupId,
      name,
      login,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      avatar,
      disabled
    })

    this.users.push(user)

    return ok(user)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredUsers = this.users

    filteredUsers = filteredUsers.filter((user) => {
      if (user.userGroupId.includes(search)) return true
      if (user.name.includes(search)) return true
      if (user.login.includes(search)) return true

      return false
    })

    return ok(filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredUsers = this.users

    filteredUsers = filteredUsers.filter((user) => {
      if (user.userGroupId.includes(filter)) return true
      if (user.name.includes(filter)) return true
      if (user.login.includes(filter)) return true

      return false
    })

    return ok(filteredUsers)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredUsers = this.users

    filteredUsers = filteredUsers.filter((user) => {
      if (user.userGroupId.includes(search)) return true
      if (user.name.includes(search)) return true
      if (user.login.includes(search)) return true

      return false
    })

    return ok(filteredUsers.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const user = this.users.find((user) => user.id === id)

    if (typeof user === 'undefined') {
      return notFound()
    } else {
      return ok(user)
    }
  }


  // update
  async update ({
    id,
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    avatar,
    disabled
  }: IUserDTO): Promise<HttpResponse> {
    const index = this.users.findIndex((user) => user.id === id)

    this.users[index].userGroupId = userGroupId
    this.users[index].name = name
    this.users[index].login = login
    this.users[index].password = password
    this.users[index].isAdmin = isAdmin
    this.users[index].isSuperUser = isSuperUser
    this.users[index].isBlocked = isBlocked
    this.users[index].blockReasonId = blockReasonId
    this.users[index].mustChangePasswordNextLogon = mustChangePasswordNextLogon
    this.users[index].avatar = avatar
    this.users[index].isDisabled = disabled

    return ok(this.users[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.users.findIndex((user) => user.id === id)

    this.users.splice(index, 1)

    return ok(this.users)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { UserRepositoryInMemory }
