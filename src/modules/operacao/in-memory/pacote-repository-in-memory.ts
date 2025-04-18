import { IPacoteDTO } from '@modules/operacao/dtos/i-pacote-dto'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PacoteRepositoryInMemory implements IPacoteRepository {
  pacotes: Pacote[] = []

  // create
  async create ({
    pedidoId,
    descricao
  }: IPacoteDTO): Promise<HttpResponse> {
    const pacote = new Pacote()

    Object.assign(pacote, {
      pedidoId,
      descricao
    })

    this.pacotes.push(pacote)

    return ok(pacote)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPacotes = this.pacotes

    filteredPacotes = filteredPacotes.filter((pacote) => {
      if (pacote.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPacotes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPacotes = this.pacotes

    filteredPacotes = filteredPacotes.filter((pacote) => {
      if (pacote.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredPacotes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPacotes = this.pacotes

    filteredPacotes = filteredPacotes.filter((pacote) => {
      if (pacote.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPacotes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pacote = this.pacotes.find((pacote) => pacote.id === id)

    if (typeof pacote === 'undefined') {
      return notFound()
    } else {
      return ok(pacote)
    }
  }


  // update
  async update ({
    id,
    pedidoId,
    descricao
  }: IPacoteDTO): Promise<HttpResponse> {
    const index = this.pacotes.findIndex((pacote) => pacote.id === id)

    this.pacotes[index].pedidoId = pedidoId
    this.pacotes[index].descricao = descricao

    return ok(this.pacotes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pacotes.findIndex((pacote) => pacote.id === id)

    this.pacotes.splice(index, 1)

    return ok(this.pacotes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PacoteRepositoryInMemory }
