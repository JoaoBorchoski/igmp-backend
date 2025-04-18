import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAlturaVaosUseCase } from './list-altura-vaos-use-case'

class ListAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listAlturaVaosUseCase = container.resolve(ListAlturaVaosUseCase)

    const alturasVaos = await listAlturaVaosUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(alturasVaos)
  }
}

export { ListAlturaVaosController }
