import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPedidoUseCase } from './list-pedido-use-case'

class ListPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPedidoUseCase = container.resolve(ListPedidoUseCase)

    const pedidos = await listPedidoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(pedidos)
  }
}

export { ListPedidoController }
