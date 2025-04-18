import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteModuleUseCase } from './multi-delete-module-use-case'
import { ListModuleUseCase } from '../list-module/list-module-use-case'

class MultiDeleteModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteModuleUseCase = container.resolve(MultiDeleteModuleUseCase)
    await multiDeleteModuleUseCase.execute(ids)


    // restore list with updated records

    const listModuleUseCase = container.resolve(ListModuleUseCase)
    const modules = await listModuleUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(modules)
  }
}

export { MultiDeleteModuleController }
