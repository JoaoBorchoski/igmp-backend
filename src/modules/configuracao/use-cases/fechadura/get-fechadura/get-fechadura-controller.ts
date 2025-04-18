import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFechaduraUseCase } from './get-fechadura-use-case'

class GetFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFechaduraUseCase = container.resolve(GetFechaduraUseCase)
    const fechadura = await getFechaduraUseCase.execute(id)

    return response.status(fechadura.statusCode).json(fechadura.data)
  }
}

export { GetFechaduraController }
