import { IAlizarDTO } from '@modules/configuracao/dtos/i-alizar-dto'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class AlizarRepositoryInMemory implements IAlizarRepository {
  alizares: Alizar[] = []

  // create
  async create ({
    nome,
    descricao
  }: IAlizarDTO): Promise<HttpResponse> {
    const alizar = new Alizar()

    Object.assign(alizar, {
      nome,
      descricao
    })

    this.alizares.push(alizar)

    return ok(alizar)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredAlizares = this.alizares

    filteredAlizares = filteredAlizares.filter((alizar) => {
      if (alizar.nome.includes(search)) return true
      if (alizar.descricao.includes(search)) return true

      return false
    })

    return ok(filteredAlizares.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredAlizares = this.alizares

    filteredAlizares = filteredAlizares.filter((alizar) => {
      if (alizar.nome.includes(filter)) return true
      if (alizar.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredAlizares)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredAlizares = this.alizares

    filteredAlizares = filteredAlizares.filter((alizar) => {
      if (alizar.nome.includes(search)) return true
      if (alizar.descricao.includes(search)) return true

      return false
    })

    return ok(filteredAlizares.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const alizar = this.alizares.find((alizar) => alizar.id === id)

    if (typeof alizar === 'undefined') {
      return notFound()
    } else {
      return ok(alizar)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IAlizarDTO): Promise<HttpResponse> {
    const index = this.alizares.findIndex((alizar) => alizar.id === id)

    this.alizares[index].nome = nome
    this.alizares[index].descricao = descricao

    return ok(this.alizares[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.alizares.findIndex((alizar) => alizar.id === id)

    this.alizares.splice(index, 1)

    return ok(this.alizares)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { AlizarRepositoryInMemory }
