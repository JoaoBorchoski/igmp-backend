import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectStatusNegociacaoUseCase } from './select-status-negociacao-use-case'

class SelectStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectStatusNegociacaoUseCase = container.resolve(SelectStatusNegociacaoUseCase)

    const statusNegociacoes = await selectStatusNegociacaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(statusNegociacoes)
  }
}

export { SelectStatusNegociacaoController }
