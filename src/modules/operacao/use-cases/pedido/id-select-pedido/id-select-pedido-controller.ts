import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPedidoUseCase } from './id-select-pedido-use-case'

class IdSelectPedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPedidoUseCase = container.resolve(IdSelectPedidoUseCase)

    const pedido = await idSelectPedidoUseCase.execute({
      id: id as string
    })

    return response.json(pedido.data)
  }
}

export { IdSelectPedidoController }
