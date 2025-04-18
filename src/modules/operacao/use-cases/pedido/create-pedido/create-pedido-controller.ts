import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePedidoUseCase } from './create-pedido-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePedidoController {
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

    const createPedidoUseCase = container.resolve(CreatePedidoUseCase)

    const result = await createPedidoUseCase.execute({
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

export { CreatePedidoController }
