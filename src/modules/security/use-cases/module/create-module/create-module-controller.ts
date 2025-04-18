import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateModuleUseCase } from './create-module-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      disabled
    } = request.body

    const createModuleUseCase = container.resolve(CreateModuleUseCase)

    const result = await createModuleUseCase.execute({
        name,
        disabled
      })
      .then(moduleResult => {
        return moduleResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateModuleController }
