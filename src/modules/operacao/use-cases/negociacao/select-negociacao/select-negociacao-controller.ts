import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectNegociacaoUseCase } from './select-negociacao-use-case'

class SelectNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectNegociacaoUseCase = container.resolve(SelectNegociacaoUseCase)

    const negociacoes = await selectNegociacaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(negociacoes)
  }
}

export { SelectNegociacaoController }
