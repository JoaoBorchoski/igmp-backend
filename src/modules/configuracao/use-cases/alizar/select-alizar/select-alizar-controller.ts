import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectAlizarUseCase } from './select-alizar-use-case'

class SelectAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectAlizarUseCase = container.resolve(SelectAlizarUseCase)

    const alizares = await selectAlizarUseCase.execute({
      filter: filter as string,
    })

    return response.json(alizares)
  }
}

export { SelectAlizarController }
