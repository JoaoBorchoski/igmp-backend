import { ITipoEnchimentoDTO } from '@modules/configuracao/dtos/i-tipo-enchimento-dto'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { TipoEnchimento } from '@modules/configuracao/infra/typeorm/entities/tipo-enchimento'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class TipoEnchimentoRepositoryInMemory implements ITipoEnchimentoRepository {
  tiposEnchimento: TipoEnchimento[] = []

  // create
  async create ({
    nome,
    descricao
  }: ITipoEnchimentoDTO): Promise<HttpResponse> {
    const tipoEnchimento = new TipoEnchimento()

    Object.assign(tipoEnchimento, {
      nome,
      descricao
    })

    this.tiposEnchimento.push(tipoEnchimento)

    return ok(tipoEnchimento)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredTiposEnchimento = this.tiposEnchimento

    filteredTiposEnchimento = filteredTiposEnchimento.filter((tipoEnchimento) => {
      if (tipoEnchimento.nome.includes(search)) return true
      if (tipoEnchimento.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposEnchimento.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredTiposEnchimento = this.tiposEnchimento

    filteredTiposEnchimento = filteredTiposEnchimento.filter((tipoEnchimento) => {
      if (tipoEnchimento.nome.includes(filter)) return true
      if (tipoEnchimento.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredTiposEnchimento)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredTiposEnchimento = this.tiposEnchimento

    filteredTiposEnchimento = filteredTiposEnchimento.filter((tipoEnchimento) => {
      if (tipoEnchimento.nome.includes(search)) return true
      if (tipoEnchimento.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposEnchimento.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const tipoEnchimento = this.tiposEnchimento.find((tipoEnchimento) => tipoEnchimento.id === id)

    if (typeof tipoEnchimento === 'undefined') {
      return notFound()
    } else {
      return ok(tipoEnchimento)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ITipoEnchimentoDTO): Promise<HttpResponse> {
    const index = this.tiposEnchimento.findIndex((tipoEnchimento) => tipoEnchimento.id === id)

    this.tiposEnchimento[index].nome = nome
    this.tiposEnchimento[index].descricao = descricao

    return ok(this.tiposEnchimento[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.tiposEnchimento.findIndex((tipoEnchimento) => tipoEnchimento.id === id)

    this.tiposEnchimento.splice(index, 1)

    return ok(this.tiposEnchimento)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { TipoEnchimentoRepositoryInMemory }
