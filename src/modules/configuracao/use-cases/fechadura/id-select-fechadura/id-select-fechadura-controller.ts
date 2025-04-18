import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFechaduraUseCase } from './id-select-fechadura-use-case'

class IdSelectFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFechaduraUseCase = container.resolve(IdSelectFechaduraUseCase)

    const fechadura = await idSelectFechaduraUseCase.execute({
      id: id as string
    })

    return response.json(fechadura.data)
  }
}

export { IdSelectFechaduraController }
