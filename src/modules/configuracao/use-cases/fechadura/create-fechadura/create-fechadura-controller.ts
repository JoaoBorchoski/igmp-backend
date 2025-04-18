import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFechaduraUseCase } from './create-fechadura-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createFechaduraUseCase = container.resolve(CreateFechaduraUseCase)

    const result = await createFechaduraUseCase.execute({
        nome,
        descricao
      })
      .then(fechaduraResult => {
        return fechaduraResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateFechaduraController }
