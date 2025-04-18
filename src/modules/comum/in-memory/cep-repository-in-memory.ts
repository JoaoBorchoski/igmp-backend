import { ICepDTO } from '@modules/comum/dtos/i-cep-dto'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CepRepositoryInMemory implements ICepRepository {
  ceps: Cep[] = []

  // create
  async create ({
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<HttpResponse> {
    const cep = new Cep()

    Object.assign(cep, {
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    })

    this.ceps.push(cep)

    return ok(cep)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCeps = this.ceps

    filteredCeps = filteredCeps.filter((cep) => {
      if (cep.codigoCep.includes(search)) return true
      if (cep.logradouro.includes(search)) return true
      if (cep.bairro.includes(search)) return true

      return false
    })

    return ok(filteredCeps.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCeps = this.ceps

    filteredCeps = filteredCeps.filter((cep) => {
      if (cep.codigoCep.includes(filter)) return true
      if (cep.logradouro.includes(filter)) return true
      if (cep.bairro.includes(filter)) return true

      return false
    })

    return ok(filteredCeps)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredCeps = this.ceps

    filteredCeps = filteredCeps.filter((cep) => {
      if (cep.codigoCep.includes(search)) return true
      if (cep.logradouro.includes(search)) return true
      if (cep.bairro.includes(search)) return true

      return false
    })

    return ok(filteredCeps.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cep = this.ceps.find((cep) => cep.id === id)

    if (typeof cep === 'undefined') {
      return notFound()
    } else {
      return ok(cep)
    }
  }


  // update
  async update ({
    id,
    codigoCep,
    logradouro,
    bairro,
    estadoId,
    cidadeId
  }: ICepDTO): Promise<HttpResponse> {
    const index = this.ceps.findIndex((cep) => cep.id === id)

    this.ceps[index].codigoCep = codigoCep
    this.ceps[index].logradouro = logradouro
    this.ceps[index].bairro = bairro
    this.ceps[index].estadoId = estadoId
    this.ceps[index].cidadeId = cidadeId

    return ok(this.ceps[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.ceps.findIndex((cep) => cep.id === id)

    this.ceps.splice(index, 1)

    return ok(this.ceps)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CepRepositoryInMemory }
