import { IMedicaoDTO } from '@modules/operacao/dtos/i-medicao-dto'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { Medicao } from '@modules/operacao/infra/typeorm/entities/medicao'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class MedicaoRepositoryInMemory implements IMedicaoRepository {
  medicoes: Medicao[] = []

  // create
  async create ({
    obraId,
    complemento,
    espessuraParede,
    larguraVaosId,
    alturaVaosId,
    tipoEnchimentoId,
    tipoPortaId,
    confirmacao,
    complementoOrigemId,
    sentidoAberturaId,
    alizarId,
    fechaduraId
  }: IMedicaoDTO): Promise<HttpResponse> {
    const medicao = new Medicao()

    Object.assign(medicao, {
      obraId,
      complemento,
      espessuraParede,
      larguraVaosId,
      alturaVaosId,
      tipoEnchimentoId,
      tipoPortaId,
      confirmacao,
      complementoOrigemId,
      sentidoAberturaId,
      alizarId,
      fechaduraId
    })

    this.medicoes.push(medicao)

    return ok(medicao)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredMedicoes = this.medicoes

    filteredMedicoes = filteredMedicoes.filter((medicao) => {

      return false
    })

    return ok(filteredMedicoes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredMedicoes = this.medicoes

    filteredMedicoes = filteredMedicoes.filter((medicao) => {

      return false
    })

    return ok(filteredMedicoes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredMedicoes = this.medicoes

    filteredMedicoes = filteredMedicoes.filter((medicao) => {

      return false
    })

    return ok(filteredMedicoes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const medicao = this.medicoes.find((medicao) => medicao.id === id)

    if (typeof medicao === 'undefined') {
      return notFound()
    } else {
      return ok(medicao)
    }
  }


  // update
  async update ({
    id,
    obraId,
    complemento,
    espessuraParede,
    larguraVaosId,
    alturaVaosId,
    tipoEnchimentoId,
    tipoPortaId,
    confirmacao,
    complementoOrigemId,
    sentidoAberturaId,
    alizarId,
    fechaduraId
  }: IMedicaoDTO): Promise<HttpResponse> {
    const index = this.medicoes.findIndex((medicao) => medicao.id === id)

    this.medicoes[index].obraId = obraId
    this.medicoes[index].complemento = complemento
    this.medicoes[index].espessuraParede = espessuraParede
    this.medicoes[index].larguraVaosId = larguraVaosId
    this.medicoes[index].alturaVaosId = alturaVaosId
    this.medicoes[index].tipoEnchimentoId = tipoEnchimentoId
    this.medicoes[index].tipoPortaId = tipoPortaId
    this.medicoes[index].confirmacao = confirmacao
    this.medicoes[index].complementoOrigemId = complementoOrigemId
    this.medicoes[index].sentidoAberturaId = sentidoAberturaId
    this.medicoes[index].alizarId = alizarId
    this.medicoes[index].fechaduraId = fechaduraId

    return ok(this.medicoes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.medicoes.findIndex((medicao) => medicao.id === id)

    this.medicoes.splice(index, 1)

    return ok(this.medicoes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { MedicaoRepositoryInMemory }
