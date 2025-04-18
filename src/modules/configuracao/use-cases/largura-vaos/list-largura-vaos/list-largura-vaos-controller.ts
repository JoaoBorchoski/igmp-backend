import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListLarguraVaosUseCase } from './list-largura-vaos-use-case'

class ListLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listLarguraVaosUseCase = container.resolve(ListLarguraVaosUseCase)

    const largurasVaos = await listLarguraVaosUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(largurasVaos)
  }
}

export { ListLarguraVaosController }
