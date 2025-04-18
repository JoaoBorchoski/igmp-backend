import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPaisUseCase } from './select-pais-use-case'

class SelectPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPaisUseCase = container.resolve(SelectPaisUseCase)

    const paises = await selectPaisUseCase.execute({
      filter: filter as string,
    })

    return response.json(paises)
  }
}

export { SelectPaisController }
