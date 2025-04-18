import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPedidoUseCase } from './select-pedido-use-case'

class SelectPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPedidoUseCase = container.resolve(SelectPedidoUseCase)

    const pedidos = await selectPedidoUseCase.execute({
      filter: filter as string,
    })

    return response.json(pedidos)
  }
}

export { SelectPedidoController }
