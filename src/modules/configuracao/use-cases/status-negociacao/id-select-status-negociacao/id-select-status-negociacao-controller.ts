import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectStatusNegociacaoUseCase } from './id-select-status-negociacao-use-case'

class IdSelectStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectStatusNegociacaoUseCase = container.resolve(IdSelectStatusNegociacaoUseCase)

    const statusNegociacao = await idSelectStatusNegociacaoUseCase.execute({
      id: id as string
    })

    return response.json(statusNegociacao.data)
  }
}

export { IdSelectStatusNegociacaoController }
