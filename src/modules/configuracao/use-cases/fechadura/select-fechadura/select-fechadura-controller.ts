import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFechaduraUseCase } from './select-fechadura-use-case'

class SelectFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectFechaduraUseCase = container.resolve(SelectFechaduraUseCase)

    const fechaduras = await selectFechaduraUseCase.execute({
      filter: filter as string,
    })

    return response.json(fechaduras)
  }
}

export { SelectFechaduraController }
