import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountStatusNegociacaoUseCase } from './count-status-negociacao-use-case'

class CountStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countStatusNegociacaoUseCase = container.resolve(CountStatusNegociacaoUseCase)

    const statusNegociacoesCount = await countStatusNegociacaoUseCase.execute({
      search: search as string
    })

    return response.status(statusNegociacoesCount.statusCode).json(statusNegociacoesCount)
  }
}

export { CountStatusNegociacaoController }
