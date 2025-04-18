import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAlizarUseCase } from './list-alizar-use-case'

class ListAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listAlizarUseCase = container.resolve(ListAlizarUseCase)

    const alizares = await listAlizarUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(alizares)
  }
}

export { ListAlizarController }
