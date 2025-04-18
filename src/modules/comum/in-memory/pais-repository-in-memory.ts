import { IPaisDTO } from '@modules/comum/dtos/i-pais-dto'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PaisRepositoryInMemory implements IPaisRepository {
  paises: Pais[] = []

  // create
  async create ({
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<HttpResponse> {
    const pais = new Pais()

    Object.assign(pais, {
      codigoPais,
      nomePais
    })

    this.paises.push(pais)

    return ok(pais)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPaises = this.paises

    filteredPaises = filteredPaises.filter((pais) => {
      if (pais.codigoPais.includes(search)) return true
      if (pais.nomePais.includes(search)) return true

      return false
    })

    return ok(filteredPaises.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPaises = this.paises

    filteredPaises = filteredPaises.filter((pais) => {
      if (pais.codigoPais.includes(filter)) return true
      if (pais.nomePais.includes(filter)) return true

      return false
    })

    return ok(filteredPaises)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPaises = this.paises

    filteredPaises = filteredPaises.filter((pais) => {
      if (pais.codigoPais.includes(search)) return true
      if (pais.nomePais.includes(search)) return true

      return false
    })

    return ok(filteredPaises.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pais = this.paises.find((pais) => pais.id === id)

    if (typeof pais === 'undefined') {
      return notFound()
    } else {
      return ok(pais)
    }
  }


  // update
  async update ({
    id,
    codigoPais,
    nomePais
  }: IPaisDTO): Promise<HttpResponse> {
    const index = this.paises.findIndex((pais) => pais.id === id)

    this.paises[index].codigoPais = codigoPais
    this.paises[index].nomePais = nomePais

    return ok(this.paises[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.paises.findIndex((pais) => pais.id === id)

    this.paises.splice(index, 1)

    return ok(this.paises)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PaisRepositoryInMemory }
