import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetStatusNegociacaoUseCase } from './get-status-negociacao-use-case'

class GetStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getStatusNegociacaoUseCase = container.resolve(GetStatusNegociacaoUseCase)
    const statusNegociacao = await getStatusNegociacaoUseCase.execute(id)

    return response.status(statusNegociacao.statusCode).json(statusNegociacao.data)
  }
}

export { GetStatusNegociacaoController }
