import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePedidoItemUseCase } from './create-pedido-item-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pedidoId,
      produto,
      quantidade,
      corEtiqueta
    } = request.body

    const createPedidoItemUseCase = container.resolve(CreatePedidoItemUseCase)

    const result = await createPedidoItemUseCase.execute({
        pedidoId,
        produto,
        quantidade,
        corEtiqueta
      })
      .then(pedidoItemResult => {
        return pedidoItemResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePedidoItemController }
