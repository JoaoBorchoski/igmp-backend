import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFechaduraUseCase } from './update-fechadura-use-case'

class UpdateFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateFechaduraUseCase = container.resolve(UpdateFechaduraUseCase)

    const result = await updateFechaduraUseCase.execute({
        id,
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

export { UpdateFechaduraController }
