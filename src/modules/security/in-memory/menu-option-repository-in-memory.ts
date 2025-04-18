import { IMenuOptionDTO } from '@modules/security/dtos/i-menu-option-dto'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class MenuOptionRepositoryInMemory implements IMenuOptionRepository {
  menuOptions: MenuOption[] = []

  // create
  async create ({
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IMenuOptionDTO): Promise<HttpResponse> {
    const menuOption = new MenuOption()

    Object.assign(menuOption, {
      moduleId,
      sequence,
      label,
      route,
      icon,
      key,
      disabled
    })

    this.menuOptions.push(menuOption)

    return ok(menuOption)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredMenuOptions = this.menuOptions

    filteredMenuOptions = filteredMenuOptions.filter((menuOption) => {
      if (menuOption.moduleId.includes(search)) return true
      if (menuOption.sequence.includes(search)) return true
      if (menuOption.label.includes(search)) return true
      if (menuOption.route.includes(search)) return true

      return false
    })

    return ok(filteredMenuOptions.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredMenuOptions = this.menuOptions

    filteredMenuOptions = filteredMenuOptions.filter((menuOption) => {
      if (menuOption.moduleId.includes(filter)) return true
      if (menuOption.sequence.includes(filter)) return true
      if (menuOption.label.includes(filter)) return true
      if (menuOption.route.includes(filter)) return true

      return false
    })

    return ok(filteredMenuOptions)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredMenuOptions = this.menuOptions

    filteredMenuOptions = filteredMenuOptions.filter((menuOption) => {
      if (menuOption.moduleId.includes(search)) return true
      if (menuOption.sequence.includes(search)) return true
      if (menuOption.label.includes(search)) return true
      if (menuOption.route.includes(search)) return true

      return false
    })

    return ok(filteredMenuOptions.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const menuOption = this.menuOptions.find((menuOption) => menuOption.id === id)

    if (typeof menuOption === 'undefined') {
      return notFound()
    } else {
      return ok(menuOption)
    }
  }


  // all
  all(): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // update
  async update ({
    id,
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IMenuOptionDTO): Promise<HttpResponse> {
    const index = this.menuOptions.findIndex((menuOption) => menuOption.id === id)

    this.menuOptions[index].moduleId = moduleId
    this.menuOptions[index].sequence = sequence
    this.menuOptions[index].label = label
    this.menuOptions[index].route = route
    this.menuOptions[index].icon = icon
    this.menuOptions[index].key = key
    this.menuOptions[index].disabled = disabled

    return ok(this.menuOptions[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.menuOptions.findIndex((menuOption) => menuOption.id === id)

    this.menuOptions.splice(index, 1)

    return ok(this.menuOptions)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { MenuOptionRepositoryInMemory }
