import { IAlturaVaosDTO } from '@modules/configuracao/dtos/i-altura-vaos-dto'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class AlturaVaosRepositoryInMemory implements IAlturaVaosRepository {
  alturasVaos: AlturaVaos[] = []

  // create
  async create ({
    nome,
    descricao
  }: IAlturaVaosDTO): Promise<HttpResponse> {
    const alturaVaos = new AlturaVaos()

    Object.assign(alturaVaos, {
      nome,
      descricao
    })

    this.alturasVaos.push(alturaVaos)

    return ok(alturaVaos)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredAlturasVaos = this.alturasVaos

    filteredAlturasVaos = filteredAlturasVaos.filter((alturaVaos) => {
      if (alturaVaos.nome.includes(search)) return true
      if (alturaVaos.descricao.includes(search)) return true

      return false
    })

    return ok(filteredAlturasVaos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredAlturasVaos = this.alturasVaos

    filteredAlturasVaos = filteredAlturasVaos.filter((alturaVaos) => {
      if (alturaVaos.nome.includes(filter)) return true
      if (alturaVaos.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredAlturasVaos)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredAlturasVaos = this.alturasVaos

    filteredAlturasVaos = filteredAlturasVaos.filter((alturaVaos) => {
      if (alturaVaos.nome.includes(search)) return true
      if (alturaVaos.descricao.includes(search)) return true

      return false
    })

    return ok(filteredAlturasVaos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const alturaVaos = this.alturasVaos.find((alturaVaos) => alturaVaos.id === id)

    if (typeof alturaVaos === 'undefined') {
      return notFound()
    } else {
      return ok(alturaVaos)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IAlturaVaosDTO): Promise<HttpResponse> {
    const index = this.alturasVaos.findIndex((alturaVaos) => alturaVaos.id === id)

    this.alturasVaos[index].nome = nome
    this.alturasVaos[index].descricao = descricao

    return ok(this.alturasVaos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.alturasVaos.findIndex((alturaVaos) => alturaVaos.id === id)

    this.alturasVaos.splice(index, 1)

    return ok(this.alturasVaos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { AlturaVaosRepositoryInMemory }
