import { IPedidoItemDTO } from '@modules/operacao/dtos/i-pedido-item-dto'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { PedidoItem } from '@modules/operacao/infra/typeorm/entities/pedido-item'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PedidoItemRepositoryInMemory implements IPedidoItemRepository {
  pedidosItems: PedidoItem[] = []

  // create
  async create ({
    pedidoId,
    produto,
    quantidade,
    corEtiqueta
  }: IPedidoItemDTO): Promise<HttpResponse> {
    const pedidoItem = new PedidoItem()

    Object.assign(pedidoItem, {
      pedidoId,
      produto,
      quantidade,
      corEtiqueta
    })

    this.pedidosItems.push(pedidoItem)

    return ok(pedidoItem)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPedidosItems = this.pedidosItems

    filteredPedidosItems = filteredPedidosItems.filter((pedidoItem) => {
      if (pedidoItem.corEtiqueta.includes(search)) return true

      return false
    })

    return ok(filteredPedidosItems.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPedidosItems = this.pedidosItems

    filteredPedidosItems = filteredPedidosItems.filter((pedidoItem) => {
      if (pedidoItem.corEtiqueta.includes(filter)) return true

      return false
    })

    return ok(filteredPedidosItems)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPedidosItems = this.pedidosItems

    filteredPedidosItems = filteredPedidosItems.filter((pedidoItem) => {
      if (pedidoItem.corEtiqueta.includes(search)) return true

      return false
    })

    return ok(filteredPedidosItems.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pedidoItem = this.pedidosItems.find((pedidoItem) => pedidoItem.id === id)

    if (typeof pedidoItem === 'undefined') {
      return notFound()
    } else {
      return ok(pedidoItem)
    }
  }


  // update
  async update ({
    id,
    pedidoId,
    produto,
    quantidade,
    corEtiqueta
  }: IPedidoItemDTO): Promise<HttpResponse> {
    const index = this.pedidosItems.findIndex((pedidoItem) => pedidoItem.id === id)

    this.pedidosItems[index].pedidoId = pedidoId
    this.pedidosItems[index].produto = produto
    this.pedidosItems[index].quantidade = quantidade
    this.pedidosItems[index].corEtiqueta = corEtiqueta

    return ok(this.pedidosItems[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pedidosItems.findIndex((pedidoItem) => pedidoItem.id === id)

    this.pedidosItems.splice(index, 1)

    return ok(this.pedidosItems)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PedidoItemRepositoryInMemory }
