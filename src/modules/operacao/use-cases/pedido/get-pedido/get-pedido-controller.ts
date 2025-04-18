import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPedidoUseCase } from './get-pedido-use-case'

class GetPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPedidoUseCase = container.resolve(GetPedidoUseCase)
    const pedido = await getPedidoUseCase.execute(id)

    return response.status(pedido.statusCode).json(pedido.data)
  }
}

export { GetPedidoController }
