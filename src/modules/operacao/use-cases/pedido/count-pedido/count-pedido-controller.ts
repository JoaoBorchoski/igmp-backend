import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPedidoUseCase } from './count-pedido-use-case'

class CountPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPedidoUseCase = container.resolve(CountPedidoUseCase)

    const pedidosCount = await countPedidoUseCase.execute({
      search: search as string
    })

    return response.status(pedidosCount.statusCode).json(pedidosCount)
  }
}

export { CountPedidoController }
