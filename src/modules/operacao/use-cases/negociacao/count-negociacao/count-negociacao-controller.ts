import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountNegociacaoUseCase } from './count-negociacao-use-case'

class CountNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countNegociacaoUseCase = container.resolve(CountNegociacaoUseCase)

    const negociacoesCount = await countNegociacaoUseCase.execute({
      search: search as string
    })

    return response.status(negociacoesCount.statusCode).json(negociacoesCount)
  }
}

export { CountNegociacaoController }
