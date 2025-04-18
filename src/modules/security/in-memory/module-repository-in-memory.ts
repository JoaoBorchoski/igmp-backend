import { IModuleDTO } from '@modules/security/dtos/i-module-dto'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ModuleRepositoryInMemory implements IModuleRepository {
  modules: Module[] = []

  // create
  async create ({
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const module = new Module()

    Object.assign(module, {
      name,
      disabled
    })

    this.modules.push(module)

    return ok(module)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredModules = this.modules

    filteredModules = filteredModules.filter((module) => {
      if (module.name.includes(search)) return true

      return false
    })

    return ok(filteredModules.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredModules = this.modules

    filteredModules = filteredModules.filter((module) => {
      if (module.name.includes(filter)) return true

      return false
    })

    return ok(filteredModules)
  }


  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredModules = this.modules

    filteredModules = filteredModules.filter((module) => {
      if (module.name.includes(search)) return true

      return false
    })

    return ok(filteredModules.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const module = this.modules.find((module) => module.id === id)

    if (typeof module === 'undefined') {
      return notFound()
    } else {
      return ok(module)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const index = this.modules.findIndex((module) => module.id === id)

    this.modules[index].name = name
    this.modules[index].disabled = disabled

    return ok(this.modules[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.modules.findIndex((module) => module.id === id)

    this.modules.splice(index, 1)

    return ok(this.modules)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ModuleRepositoryInMemory }
