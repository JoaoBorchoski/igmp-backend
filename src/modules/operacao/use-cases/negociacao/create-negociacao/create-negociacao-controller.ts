import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNegociacaoUseCase } from './create-negociacao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    } = request.body

    const createNegociacaoUseCase = container.resolve(CreateNegociacaoUseCase)

    const result = await createNegociacaoUseCase.execute({
        medicaoId,
        clienteId,
        statusNegociacaoId,
        funcionarioId,
        dataCriacao,
        dataFechamento,
        valorEstimado,
        descricao,
        motivoPerda
      })
      .then(negociacaoResult => {
        return negociacaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateNegociacaoController }
