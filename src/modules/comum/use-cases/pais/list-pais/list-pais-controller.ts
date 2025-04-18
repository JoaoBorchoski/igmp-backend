import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPaisUseCase } from './list-pais-use-case'

class ListPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPaisUseCase = container.resolve(ListPaisUseCase)

    const paises = await listPaisUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(paises)
  }
}

export { ListPaisController }
