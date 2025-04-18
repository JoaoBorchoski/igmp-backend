import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCidadeUseCase } from './list-cidade-use-case'

class ListCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCidadeUseCase = container.resolve(ListCidadeUseCase)

    const cidades = await listCidadeUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(cidades)
  }
}

export { ListCidadeController }
