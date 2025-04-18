import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectModuleUseCase } from './select-module-use-case'

class SelectModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectModuleUseCase = container.resolve(SelectModuleUseCase)

    const modules = await selectModuleUseCase.execute({
      filter: filter as string,
    })

    return response.json(modules)
  }
}

export { SelectModuleController }
