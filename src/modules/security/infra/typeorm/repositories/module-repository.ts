import { getRepository, Repository } from 'typeorm'
import { IModuleDTO } from '@modules/security/dtos/i-module-dto'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class ModuleRepository implements IModuleRepository {
  private repository: Repository<Module>

  constructor() {
    this.repository = getRepository(Module)
  }


  // create
  async create ({
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const module = this.repository.create({
      name,
      disabled
    })

    const result = await this.repository.save(module)
      .then(moduleResult => {
        return ok(moduleResult)
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
      "name"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
          'mod.name as "name"',
        ])
        .where('mod.name ilike :search', { search: `%${search}%` })
        .addOrderBy('mod.name', columnOrder[0])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (modules.length > rowsPerPage) {
        modules = modules.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(modules)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "value"',
          'mod.name as "label"',
        ])
        .where('mod.name ilike :filter', { filter: `${filter}%` })
        .addOrderBy('mod.name')
        .getRawMany()

      return ok(modules)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const module = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "value"',
          'mod.name as "label"',
        ])
        .where('mod.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(module)
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
      const modules = await this.repository.createQueryBuilder('mod')
        .select([
          'mod.id as "id"',
        ])
        .where('mod.name ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: modules.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const module = await this.repository.findOne(id)

      if (typeof module === 'undefined') {
        return noContent()
      }

      return ok(module)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    disabled
  }: IModuleDTO): Promise<HttpResponse> {
    const module = await this.repository.findOne(id)

    if (!module) {
      return notFound()
    }

    const newmodule = this.repository.create({
      id,
      name,
      disabled
    })

    try {
      await this.repository.save(newmodule)

      return ok(newmodule)
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

export { ModuleRepository }
