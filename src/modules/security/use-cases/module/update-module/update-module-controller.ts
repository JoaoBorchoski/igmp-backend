import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateModuleUseCase } from './update-module-use-case'

class UpdateModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      disabled
    } = request.body

    const { id } = request.params

    const updateModuleUseCase = container.resolve(UpdateModuleUseCase)

    const result = await updateModuleUseCase.execute({
        id,
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

export { UpdateModuleController }
