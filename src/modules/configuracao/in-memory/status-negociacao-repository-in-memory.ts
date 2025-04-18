import { IStatusNegociacaoDTO } from '@modules/configuracao/dtos/i-status-negociacao-dto'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { StatusNegociacao } from '@modules/configuracao/infra/typeorm/entities/status-negociacao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class StatusNegociacaoRepositoryInMemory implements IStatusNegociacaoRepository {
  statusNegociacoes: StatusNegociacao[] = []

  // create
  async create ({
    nome,
    descricao
  }: IStatusNegociacaoDTO): Promise<HttpResponse> {
    const statusNegociacao = new StatusNegociacao()

    Object.assign(statusNegociacao, {
      nome,
      descricao
    })

    this.statusNegociacoes.push(statusNegociacao)

    return ok(statusNegociacao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredStatusNegociacoes = this.statusNegociacoes

    filteredStatusNegociacoes = filteredStatusNegociacoes.filter((statusNegociacao) => {
      if (statusNegociacao.nome.includes(search)) return true
      if (statusNegociacao.descricao.includes(search)) return true

      return false
    })

    return ok(filteredStatusNegociacoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredStatusNegociacoes = this.statusNegociacoes

    filteredStatusNegociacoes = filteredStatusNegociacoes.filter((statusNegociacao) => {
      if (statusNegociacao.nome.includes(filter)) return true
      if (statusNegociacao.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredStatusNegociacoes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredStatusNegociacoes = this.statusNegociacoes

    filteredStatusNegociacoes = filteredStatusNegociacoes.filter((statusNegociacao) => {
      if (statusNegociacao.nome.includes(search)) return true
      if (statusNegociacao.descricao.includes(search)) return true

      return false
    })

    return ok(filteredStatusNegociacoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const statusNegociacao = this.statusNegociacoes.find((statusNegociacao) => statusNegociacao.id === id)

    if (typeof statusNegociacao === 'undefined') {
      return notFound()
    } else {
      return ok(statusNegociacao)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IStatusNegociacaoDTO): Promise<HttpResponse> {
    const index = this.statusNegociacoes.findIndex((statusNegociacao) => statusNegociacao.id === id)

    this.statusNegociacoes[index].nome = nome
    this.statusNegociacoes[index].descricao = descricao

    return ok(this.statusNegociacoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.statusNegociacoes.findIndex((statusNegociacao) => statusNegociacao.id === id)

    this.statusNegociacoes.splice(index, 1)

    return ok(this.statusNegociacoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { StatusNegociacaoRepositoryInMemory }
