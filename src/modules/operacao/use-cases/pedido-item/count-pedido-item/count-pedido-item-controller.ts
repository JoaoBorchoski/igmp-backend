import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPedidoItemUseCase } from './count-pedido-item-use-case'

class CountPedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPedidoItemUseCase = container.resolve(CountPedidoItemUseCase)

    const pedidosItemsCount = await countPedidoItemUseCase.execute({
      search: search as string
    })

    return response.status(pedidosItemsCount.statusCode).json(pedidosItemsCount)
  }
}

export { CountPedidoItemController }
