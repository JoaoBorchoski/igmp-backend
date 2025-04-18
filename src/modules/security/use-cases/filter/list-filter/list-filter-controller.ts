import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFilterUseCase } from './list-filter-use-case'

class ListFilterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listFilterUseCase = container.resolve(ListFilterUseCase)

    const filters = await listFilterUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(filters)
  }
}

export { ListFilterController }
