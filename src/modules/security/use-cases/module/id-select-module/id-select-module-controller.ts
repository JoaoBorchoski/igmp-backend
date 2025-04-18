import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectModuleUseCase } from './id-select-module-use-case'

class IdSelectModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectModuleUseCase = container.resolve(IdSelectModuleUseCase)

    const module = await idSelectModuleUseCase.execute({
      id: id as string
    })

    return response.json(module.data)
  }
}

export { IdSelectModuleController }
