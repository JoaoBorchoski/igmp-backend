import { ITipoPortaDTO } from '@modules/configuracao/dtos/i-tipo-porta-dto'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { TipoPorta } from '@modules/configuracao/infra/typeorm/entities/tipo-porta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class TipoPortaRepositoryInMemory implements ITipoPortaRepository {
  tiposPorta: TipoPorta[] = []

  // create
  async create ({
    nome,
    descricao
  }: ITipoPortaDTO): Promise<HttpResponse> {
    const tipoPorta = new TipoPorta()

    Object.assign(tipoPorta, {
      nome,
      descricao
    })

    this.tiposPorta.push(tipoPorta)

    return ok(tipoPorta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredTiposPorta = this.tiposPorta

    filteredTiposPorta = filteredTiposPorta.filter((tipoPorta) => {
      if (tipoPorta.nome.includes(search)) return true
      if (tipoPorta.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposPorta.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredTiposPorta = this.tiposPorta

    filteredTiposPorta = filteredTiposPorta.filter((tipoPorta) => {
      if (tipoPorta.nome.includes(filter)) return true
      if (tipoPorta.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredTiposPorta)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredTiposPorta = this.tiposPorta

    filteredTiposPorta = filteredTiposPorta.filter((tipoPorta) => {
      if (tipoPorta.nome.includes(search)) return true
      if (tipoPorta.descricao.includes(search)) return true

      return false
    })

    return ok(filteredTiposPorta.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const tipoPorta = this.tiposPorta.find((tipoPorta) => tipoPorta.id === id)

    if (typeof tipoPorta === 'undefined') {
      return notFound()
    } else {
      return ok(tipoPorta)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: ITipoPortaDTO): Promise<HttpResponse> {
    const index = this.tiposPorta.findIndex((tipoPorta) => tipoPorta.id === id)

    this.tiposPorta[index].nome = nome
    this.tiposPorta[index].descricao = descricao

    return ok(this.tiposPorta[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.tiposPorta.findIndex((tipoPorta) => tipoPorta.id === id)

    this.tiposPorta.splice(index, 1)

    return ok(this.tiposPorta)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { TipoPortaRepositoryInMemory }
