import { IPacoteItemDTO } from '@modules/operacao/dtos/i-pacote-item-dto'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PacoteItemRepositoryInMemory implements IPacoteItemRepository {
  pacotesItems: PacoteItem[] = []

  // create
  async create ({
    pacoteId,
    produto,
    quantidade
  }: IPacoteItemDTO): Promise<HttpResponse> {
    const pacoteItem = new PacoteItem()

    Object.assign(pacoteItem, {
      pacoteId,
      produto,
      quantidade
    })

    this.pacotesItems.push(pacoteItem)

    return ok(pacoteItem)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPacotesItems = this.pacotesItems

    filteredPacotesItems = filteredPacotesItems.filter((pacoteItem) => {

      return false
    })

    return ok(filteredPacotesItems.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPacotesItems = this.pacotesItems

    filteredPacotesItems = filteredPacotesItems.filter((pacoteItem) => {

      return false
    })

    return ok(filteredPacotesItems)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPacotesItems = this.pacotesItems

    filteredPacotesItems = filteredPacotesItems.filter((pacoteItem) => {

      return false
    })

    return ok(filteredPacotesItems.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pacoteItem = this.pacotesItems.find((pacoteItem) => pacoteItem.id === id)

    if (typeof pacoteItem === 'undefined') {
      return notFound()
    } else {
      return ok(pacoteItem)
    }
  }


  // update
  async update ({
    id,
    pacoteId,
    produto,
    quantidade
  }: IPacoteItemDTO): Promise<HttpResponse> {
    const index = this.pacotesItems.findIndex((pacoteItem) => pacoteItem.id === id)

    this.pacotesItems[index].pacoteId = pacoteId
    this.pacotesItems[index].produto = produto
    this.pacotesItems[index].quantidade = quantidade

    return ok(this.pacotesItems[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pacotesItems.findIndex((pacoteItem) => pacoteItem.id === id)

    this.pacotesItems.splice(index, 1)

    return ok(this.pacotesItems)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PacoteItemRepositoryInMemory }
