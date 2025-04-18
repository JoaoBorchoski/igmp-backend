import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetModuleUseCase } from './get-module-use-case'

class GetModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getModuleUseCase = container.resolve(GetModuleUseCase)
    const module = await getModuleUseCase.execute(id)

    return response.status(module.statusCode).json(module.data)
  }
}

export { GetModuleController }
