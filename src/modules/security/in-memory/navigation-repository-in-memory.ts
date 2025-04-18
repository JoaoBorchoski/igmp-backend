import { INavigationDTO } from '@modules/security/dtos/i-navigation-dto'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class NavigationRepositoryInMemory implements INavigationRepository {
  navigations: Navigation[] = []

  // create
  async create ({
    userId,
    navigationDate,
    route
  }: INavigationDTO): Promise<HttpResponse> {
    const navigation = new Navigation()

    Object.assign(navigation, {
      userId,
      navigationDate,
      route
    })

    this.navigations.push(navigation)

    return ok(navigation)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredNavigations = this.navigations

    filteredNavigations = filteredNavigations.filter((navigation) => {
      if (navigation.userId.includes(search)) return true
      if (navigation.route.includes(search)) return true

      return false
    })

    return ok(filteredNavigations.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredNavigations = this.navigations

    filteredNavigations = filteredNavigations.filter((navigation) => {
      if (navigation.userId.includes(filter)) return true
      if (navigation.route.includes(filter)) return true

      return false
    })

    return ok(filteredNavigations)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredNavigations = this.navigations

    filteredNavigations = filteredNavigations.filter((navigation) => {
      if (navigation.userId.includes(search)) return true
      if (navigation.route.includes(search)) return true

      return false
    })

    return ok(filteredNavigations.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const navigation = this.navigations.find((navigation) => navigation.id === id)

    if (typeof navigation === 'undefined') {
      return notFound()
    } else {
      return ok(navigation)
    }
  }


  // update
  async update ({
    id,
    userId,
    navigationDate,
    route
  }: INavigationDTO): Promise<HttpResponse> {
    const index = this.navigations.findIndex((navigation) => navigation.id === id)

    this.navigations[index].userId = userId
    this.navigations[index].navigationDate = navigationDate
    this.navigations[index].route = route

    return ok(this.navigations[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.navigations.findIndex((navigation) => navigation.id === id)

    this.navigations.splice(index, 1)

    return ok(this.navigations)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { NavigationRepositoryInMemory }
