import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePedidoUseCase } from './update-pedido-use-case'

class UpdatePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      sequencial,
      cliente,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      estadoId,
      cidadeId,
      status
    } = request.body

    const { id } = request.params

    const updatePedidoUseCase = container.resolve(UpdatePedidoUseCase)

    const result = await updatePedidoUseCase.execute({
        id,
        sequencial,
        cliente,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        estadoId,
        cidadeId,
        status
      })
      .then(pedidoResult => {
        return pedidoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePedidoController }
