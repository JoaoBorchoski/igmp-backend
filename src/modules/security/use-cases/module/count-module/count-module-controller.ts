import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountModuleUseCase } from './count-module-use-case'

class CountModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countModuleUseCase = container.resolve(CountModuleUseCase)

    const modulesCount = await countModuleUseCase.execute({
      search: search as string
    })

    return response.status(modulesCount.statusCode).json(modulesCount)
  }
}

export { CountModuleController }
