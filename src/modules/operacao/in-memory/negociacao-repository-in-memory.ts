import { INegociacaoDTO } from '@modules/operacao/dtos/i-negociacao-dto'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { Negociacao } from '@modules/operacao/infra/typeorm/entities/negociacao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class NegociacaoRepositoryInMemory implements INegociacaoRepository {
  negociacoes: Negociacao[] = []

  // create
  async create ({
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: INegociacaoDTO): Promise<HttpResponse> {
    const negociacao = new Negociacao()

    Object.assign(negociacao, {
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    })

    this.negociacoes.push(negociacao)

    return ok(negociacao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredNegociacoes = this.negociacoes

    filteredNegociacoes = filteredNegociacoes.filter((negociacao) => {

      return false
    })

    return ok(filteredNegociacoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredNegociacoes = this.negociacoes

    filteredNegociacoes = filteredNegociacoes.filter((negociacao) => {

      return false
    })

    return ok(filteredNegociacoes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredNegociacoes = this.negociacoes

    filteredNegociacoes = filteredNegociacoes.filter((negociacao) => {

      return false
    })

    return ok(filteredNegociacoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const negociacao = this.negociacoes.find((negociacao) => negociacao.id === id)

    if (typeof negociacao === 'undefined') {
      return notFound()
    } else {
      return ok(negociacao)
    }
  }


  // update
  async update ({
    id,
    medicaoId,
    clienteId,
    statusNegociacaoId,
    funcionarioId,
    dataCriacao,
    dataFechamento,
    valorEstimado,
    descricao,
    motivoPerda
  }: INegociacaoDTO): Promise<HttpResponse> {
    const index = this.negociacoes.findIndex((negociacao) => negociacao.id === id)

    this.negociacoes[index].medicaoId = medicaoId
    this.negociacoes[index].clienteId = clienteId
    this.negociacoes[index].statusNegociacaoId = statusNegociacaoId
    this.negociacoes[index].funcionarioId = funcionarioId
    this.negociacoes[index].dataCriacao = dataCriacao
    this.negociacoes[index].dataFechamento = dataFechamento
    this.negociacoes[index].valorEstimado = valorEstimado
    this.negociacoes[index].descricao = descricao
    this.negociacoes[index].motivoPerda = motivoPerda

    return ok(this.negociacoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.negociacoes.findIndex((negociacao) => negociacao.id === id)

    this.negociacoes.splice(index, 1)

    return ok(this.negociacoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { NegociacaoRepositoryInMemory }
