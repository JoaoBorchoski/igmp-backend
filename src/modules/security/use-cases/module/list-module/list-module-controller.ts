import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListModuleUseCase } from './list-module-use-case'

class ListModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listModuleUseCase = container.resolve(ListModuleUseCase)

    const modules = await listModuleUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(modules)
  }
}

export { ListModuleController }
