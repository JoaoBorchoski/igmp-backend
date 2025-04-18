import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPedidoItemUseCase } from './select-pedido-item-use-case'

class SelectPedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPedidoItemUseCase = container.resolve(SelectPedidoItemUseCase)

    const pedidosItems = await selectPedidoItemUseCase.execute({
      filter: filter as string,
    })

    return response.json(pedidosItems)
  }
}

export { SelectPedidoItemController }
