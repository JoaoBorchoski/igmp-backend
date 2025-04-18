import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateConfigUseCase } from './update-config-use-case'

class UpdateConfigController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description
    } = request.body

    const updateConfigUseCase = container.resolve(UpdateConfigUseCase)

    const result = await updateConfigUseCase.execute({
        title,
        description
      })
      .then(configResult => {
        return configResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateConfigController }
