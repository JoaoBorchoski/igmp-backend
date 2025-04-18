import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateConfigUseCase } from './create-config-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateConfigController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description
    } = request.body

    const createConfigUseCase = container.resolve(CreateConfigUseCase)

    const result = await createConfigUseCase.execute({
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

export { CreateConfigController }
