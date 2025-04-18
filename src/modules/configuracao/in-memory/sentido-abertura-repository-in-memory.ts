import { ISentidoAberturaDTO } from '@modules/configuracao/dtos/i-sentido-abertura-dto'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { SentidoAbertura } from '@modules/configuracao/infra/typeorm/entities/sentido-abertura'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class SentidoAberturaRepositoryInMemory implements ISentidoAberturaRepository {
  sentidosAbertura: SentidoAbertura[] = []

  // create
  async create ({
    nome,
    descricao
  }: ISentidoAberturaDTO): Promise<HttpResponse> {
    const sentidoAbertura = new SentidoAbertura()

    Object.assign(sentidoAbertura, {
      nome,
      descricao
    })

    this.sentidosAbertura.push(sentidoAbertura)

    return ok(sentidoAbertura)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredSentidosAbertura = this.sentidosAbertura

    filteredSentidosAbertura = filteredSentidosAbertura.filter((sentidoAbertura) => {
      if (sentidoAbertura.nome.includes(search)) return true
      if (sentidoAbertura.descricao.includes(search)) return true

      return false
    })

    return ok(filteredSentidosAbertura.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredSentidosAbertura = this.sentidosAbertura

    filteredSentidosAbertura = filteredSentidosAbertura.filter((sentidoAbertura) => {
      if (sentidoAbertura.nome.includes(filter)) return true
      if (sentidoAbertura.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredSentidosAbertura)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredSentidosAbertura = this.sentidosAbertura

    filteredSentidosAbertura = filteredSentidosAbertura.filter((sentidoAbertura) => {
      if (sentidoAbertura.nome.includes(search)) return true
      if (sentidoAbertura.descricao.includes(search)) return true

      return false
    })

    return ok(filteredSentidosAbertura.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const sentidoAbertura = this.sentidosAbertura.find((sentidoAbertura) => sentidoAbertura.id === id)

    if (typeof sentidoAbertura === 'undefined') {
      return notFound()
    } else {
      return ok(sentidoAbertura)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ISentidoAberturaDTO): Promise<HttpResponse> {
    const index = this.sentidosAbertura.findIndex((sentidoAbertura) => sentidoAbertura.id === id)

    this.sentidosAbertura[index].nome = nome
    this.sentidosAbertura[index].descricao = descricao

    return ok(this.sentidosAbertura[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.sentidosAbertura.findIndex((sentidoAbertura) => sentidoAbertura.id === id)

    this.sentidosAbertura.splice(index, 1)

    return ok(this.sentidosAbertura)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { SentidoAberturaRepositoryInMemory }
