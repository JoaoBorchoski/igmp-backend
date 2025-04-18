import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePedidoItemUseCase } from './update-pedido-item-use-case'

class UpdatePedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pedidoId,
      produto,
      quantidade,
      corEtiqueta
    } = request.body

    const { id } = request.params

    const updatePedidoItemUseCase = container.resolve(UpdatePedidoItemUseCase)

    const result = await updatePedidoItemUseCase.execute({
        id,
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

export { UpdatePedidoItemController }
