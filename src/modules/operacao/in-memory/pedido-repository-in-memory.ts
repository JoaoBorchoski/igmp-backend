import { IPedidoDTO } from '@modules/operacao/dtos/i-pedido-dto'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { Pedido } from '@modules/operacao/infra/typeorm/entities/pedido'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PedidoRepositoryInMemory implements IPedidoRepository {
  pedidos: Pedido[] = []

  // create
  async create ({
    sequencial,
    cliente,
    telefone,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    estadoId,
    cidadeId,
    status
  }: IPedidoDTO): Promise<HttpResponse> {
    const pedido = new Pedido()

    Object.assign(pedido, {
      sequencial,
      cliente,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      estadoId,
      cidadeId,
      status
    })

    this.pedidos.push(pedido)

    return ok(pedido)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPedidos = this.pedidos

    filteredPedidos = filteredPedidos.filter((pedido) => {
      if (pedido.cliente.includes(search)) return true

      return false
    })

    return ok(filteredPedidos.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPedidos = this.pedidos

    filteredPedidos = filteredPedidos.filter((pedido) => {
      if (pedido.cliente.includes(filter)) return true

      return false
    })

    return ok(filteredPedidos)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPedidos = this.pedidos

    filteredPedidos = filteredPedidos.filter((pedido) => {
      if (pedido.cliente.includes(search)) return true

      return false
    })

    return ok(filteredPedidos.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const pedido = this.pedidos.find((pedido) => pedido.id === id)

    if (typeof pedido === 'undefined') {
      return notFound()
    } else {
      return ok(pedido)
    }
  }


  // update
  async update ({
    id,
    sequencial,
    cliente,
    telefone,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    estadoId,
    cidadeId,
    status
  }: IPedidoDTO): Promise<HttpResponse> {
    const index = this.pedidos.findIndex((pedido) => pedido.id === id)

    this.pedidos[index].sequencial = sequencial
    this.pedidos[index].cliente = cliente
    this.pedidos[index].telefone = telefone
    this.pedidos[index].cep = cep
    this.pedidos[index].endereco = endereco
    this.pedidos[index].numero = numero
    this.pedidos[index].complemento = complemento
    this.pedidos[index].bairro = bairro
    this.pedidos[index].estadoId = estadoId
    this.pedidos[index].cidadeId = cidadeId
    this.pedidos[index].status = status

    return ok(this.pedidos[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.pedidos.findIndex((pedido) => pedido.id === id)

    this.pedidos.splice(index, 1)

    return ok(this.pedidos)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PedidoRepositoryInMemory }
