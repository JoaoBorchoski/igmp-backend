import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPedidoItemUseCase } from './id-select-pedido-item-use-case'

class IdSelectPedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPedidoItemUseCase = container.resolve(IdSelectPedidoItemUseCase)

    const pedidoItem = await idSelectPedidoItemUseCase.execute({
      id: id as string
    })

    return response.json(pedidoItem.data)
  }
}

export { IdSelectPedidoItemController }
