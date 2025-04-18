import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPadraoCorUseCase } from './select-padrao-cor-use-case'

class SelectPadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPadraoCorUseCase = container.resolve(SelectPadraoCorUseCase)

    const padroesCores = await selectPadraoCorUseCase.execute({
      filter: filter as string,
    })

    return response.json(padroesCores)
  }
}

export { SelectPadraoCorController }
