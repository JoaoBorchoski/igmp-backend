import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetNegociacaoUseCase } from './get-negociacao-use-case'

class GetNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getNegociacaoUseCase = container.resolve(GetNegociacaoUseCase)
    const negociacao = await getNegociacaoUseCase.execute(id)

    return response.status(negociacao.statusCode).json(negociacao.data)
  }
}

export { GetNegociacaoController }
