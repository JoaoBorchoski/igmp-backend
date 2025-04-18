import { IEstadoDTO } from '@modules/comum/dtos/i-estado-dto'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class EstadoRepositoryInMemory implements IEstadoRepository {
  estados: Estado[] = []

  // create
  async create ({
    codigoIbge,
    uf,
    nomeEstado
  }: IEstadoDTO): Promise<HttpResponse> {
    const estado = new Estado()

    Object.assign(estado, {
      codigoIbge,
      uf,
      nomeEstado
    })

    this.estados.push(estado)

    return ok(estado)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.uf.includes(search)) return true
      if (estado.nomeEstado.includes(search)) return true

      return false
    })

    return ok(filteredEstados.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.uf.includes(filter)) return true
      if (estado.nomeEstado.includes(filter)) return true

      return false
    })

    return ok(filteredEstados)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredEstados = this.estados

    filteredEstados = filteredEstados.filter((estado) => {
      if (estado.uf.includes(search)) return true
      if (estado.nomeEstado.includes(search)) return true

      return false
    })

    return ok(filteredEstados.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const estado = this.estados.find((estado) => estado.id === id)

    if (typeof estado === 'undefined') {
      return notFound()
    } else {
      return ok(estado)
    }
  }


  // update
  async update ({
    id,
    codigoIbge,
    uf,
    nomeEstado
  }: IEstadoDTO): Promise<HttpResponse> {
    const index = this.estados.findIndex((estado) => estado.id === id)

    this.estados[index].codigoIbge = codigoIbge
    this.estados[index].uf = uf
    this.estados[index].nomeEstado = nomeEstado

    return ok(this.estados[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.estados.findIndex((estado) => estado.id === id)

    this.estados.splice(index, 1)

    return ok(this.estados)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { EstadoRepositoryInMemory }
