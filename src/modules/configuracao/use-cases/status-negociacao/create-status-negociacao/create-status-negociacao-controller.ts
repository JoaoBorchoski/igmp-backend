import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateStatusNegociacaoUseCase } from './create-status-negociacao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createStatusNegociacaoUseCase = container.resolve(CreateStatusNegociacaoUseCase)

    const result = await createStatusNegociacaoUseCase.execute({
        nome,
        descricao
      })
      .then(statusNegociacaoResult => {
        return statusNegociacaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateStatusNegociacaoController }
