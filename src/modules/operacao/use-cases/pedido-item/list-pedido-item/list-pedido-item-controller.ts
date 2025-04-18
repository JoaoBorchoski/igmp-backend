import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPedidoItemUseCase } from './list-pedido-item-use-case'

class ListPedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPedidoItemUseCase = container.resolve(ListPedidoItemUseCase)

    const pedidosItems = await listPedidoItemUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(pedidosItems)
  }
}

export { ListPedidoItemController }
