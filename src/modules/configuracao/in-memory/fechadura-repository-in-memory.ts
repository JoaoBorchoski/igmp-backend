import { IFechaduraDTO } from '@modules/configuracao/dtos/i-fechadura-dto'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { Fechadura } from '@modules/configuracao/infra/typeorm/entities/fechadura'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class FechaduraRepositoryInMemory implements IFechaduraRepository {
  fechaduras: Fechadura[] = []

  // create
  async create ({
    nome,
    descricao
  }: IFechaduraDTO): Promise<HttpResponse> {
    const fechadura = new Fechadura()

    Object.assign(fechadura, {
      nome,
      descricao
    })

    this.fechaduras.push(fechadura)

    return ok(fechadura)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredFechaduras = this.fechaduras

    filteredFechaduras = filteredFechaduras.filter((fechadura) => {
      if (fechadura.nome.includes(search)) return true
      if (fechadura.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFechaduras.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredFechaduras = this.fechaduras

    filteredFechaduras = filteredFechaduras.filter((fechadura) => {
      if (fechadura.nome.includes(filter)) return true
      if (fechadura.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredFechaduras)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredFechaduras = this.fechaduras

    filteredFechaduras = filteredFechaduras.filter((fechadura) => {
      if (fechadura.nome.includes(search)) return true
      if (fechadura.descricao.includes(search)) return true

      return false
    })

    return ok(filteredFechaduras.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const fechadura = this.fechaduras.find((fechadura) => fechadura.id === id)

    if (typeof fechadura === 'undefined') {
      return notFound()
    } else {
      return ok(fechadura)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IFechaduraDTO): Promise<HttpResponse> {
    const index = this.fechaduras.findIndex((fechadura) => fechadura.id === id)

    this.fechaduras[index].nome = nome
    this.fechaduras[index].descricao = descricao

    return ok(this.fechaduras[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.fechaduras.findIndex((fechadura) => fechadura.id === id)

    this.fechaduras.splice(index, 1)

    return ok(this.fechaduras)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { FechaduraRepositoryInMemory }
