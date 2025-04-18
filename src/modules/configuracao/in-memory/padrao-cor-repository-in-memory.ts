import { IPadraoCorDTO } from '@modules/configuracao/dtos/i-padrao-cor-dto'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { PadraoCor } from '@modules/configuracao/infra/typeorm/entities/padrao-cor'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PadraoCorRepositoryInMemory implements IPadraoCorRepository {
  padroesCores: PadraoCor[] = []

  // create
  async create ({
    nome,
    descricao
  }: IPadraoCorDTO): Promise<HttpResponse> {
    const padraoCor = new PadraoCor()

    Object.assign(padraoCor, {
      nome,
      descricao
    })

    this.padroesCores.push(padraoCor)

    return ok(padraoCor)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPadroesCores = this.padroesCores

    filteredPadroesCores = filteredPadroesCores.filter((padraoCor) => {
      if (padraoCor.nome.includes(search)) return true
      if (padraoCor.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPadroesCores.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPadroesCores = this.padroesCores

    filteredPadroesCores = filteredPadroesCores.filter((padraoCor) => {
      if (padraoCor.nome.includes(filter)) return true
      if (padraoCor.descricao.includes(filter)) return true

      return false
    })

    return ok(filteredPadroesCores)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPadroesCores = this.padroesCores

    filteredPadroesCores = filteredPadroesCores.filter((padraoCor) => {
      if (padraoCor.nome.includes(search)) return true
      if (padraoCor.descricao.includes(search)) return true

      return false
    })

    return ok(filteredPadroesCores.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const padraoCor = this.padroesCores.find((padraoCor) => padraoCor.id === id)

    if (typeof padraoCor === 'undefined') {
      return notFound()
    } else {
      return ok(padraoCor)
    }
  }


  // update
  async update ({
    id,
    nome,
    descricao
  }: IPadraoCorDTO): Promise<HttpResponse> {
    const index = this.padroesCores.findIndex((padraoCor) => padraoCor.id === id)

    this.padroesCores[index].nome = nome
    this.padroesCores[index].descricao = descricao

    return ok(this.padroesCores[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.padroesCores.findIndex((padraoCor) => padraoCor.id === id)

    this.padroesCores.splice(index, 1)

    return ok(this.padroesCores)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PadraoCorRepositoryInMemory }
