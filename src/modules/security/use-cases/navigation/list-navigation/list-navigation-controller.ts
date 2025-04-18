import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListNavigationUseCase } from './list-navigation-use-case'

class ListNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listNavigationUseCase = container.resolve(ListNavigationUseCase)

    const navigations = await listNavigationUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(navigations)
  }
}

export { ListNavigationController }
