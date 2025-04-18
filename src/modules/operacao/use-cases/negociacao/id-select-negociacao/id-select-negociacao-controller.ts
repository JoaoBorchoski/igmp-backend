import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectNegociacaoUseCase } from './id-select-negociacao-use-case'

class IdSelectNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectNegociacaoUseCase = container.resolve(IdSelectNegociacaoUseCase)

    const negociacao = await idSelectNegociacaoUseCase.execute({
      id: id as string
    })

    return response.json(negociacao.data)
  }
}

export { IdSelectNegociacaoController }
