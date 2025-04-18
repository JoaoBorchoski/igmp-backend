import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPedidoItemUseCase } from './get-pedido-item-use-case'

class GetPedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPedidoItemUseCase = container.resolve(GetPedidoItemUseCase)
    const pedidoItem = await getPedidoItemUseCase.execute(id)

    return response.status(pedidoItem.statusCode).json(pedidoItem.data)
  }
}

export { GetPedidoItemController }
