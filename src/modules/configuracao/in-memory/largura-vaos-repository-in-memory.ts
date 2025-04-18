import { ILarguraVaosDTO } from '@modules/configuracao/dtos/i-largura-vaos-dto'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class LarguraVaosRepositoryInMemory implements ILarguraVaosRepository {
  largurasVaos: LarguraVaos[] = []

  // create
  async create ({
    nome,
    descricao
  }: ILarguraVaosDTO): Promise<HttpResponse> {
    const larguraVaos = new LarguraVaos()

    Object.assign(larguraVaos, {
      nome,
      descricao
    })

    this.largurasVaos.push(larguraVaos)

    return ok(larguraVaos)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredLargurasVaos = this.largurasVaos

    filteredLargurasVaos = filteredLargurasVaos.filter((larguraVaos) => {
      if (larguraVaos.nome.includes(search)) return true
      if (larguraVaos.descricao.includes(search)) return true

      return false
    })

    return ok(filteredLargurasVaos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredLargurasVaos = this.largurasVaos

    filteredLargurasVaos = filteredLargurasVaos.filter((larguraVaos) => {
      if (larguraVaos.nome.includes(filter)) return true
      if (larguraVaos.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredLargurasVaos)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredLargurasVaos = this.largurasVaos

    filteredLargurasVaos = filteredLargurasVaos.filter((larguraVaos) => {
      if (larguraVaos.nome.includes(search)) return true
      if (larguraVaos.descricao.includes(search)) return true

      return false
    })

    return ok(filteredLargurasVaos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const larguraVaos = this.largurasVaos.find((larguraVaos) => larguraVaos.id === id)

    if (typeof larguraVaos === 'undefined') {
      return notFound()
    } else {
      return ok(larguraVaos)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ILarguraVaosDTO): Promise<HttpResponse> {
    const index = this.largurasVaos.findIndex((larguraVaos) => larguraVaos.id === id)

    this.largurasVaos[index].nome = nome
    this.largurasVaos[index].descricao = descricao

    return ok(this.largurasVaos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.largurasVaos.findIndex((larguraVaos) => larguraVaos.id === id)

    this.largurasVaos.splice(index, 1)

    return ok(this.largurasVaos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { LarguraVaosRepositoryInMemory }
