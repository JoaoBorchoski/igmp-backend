import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFechaduraUseCase } from './list-fechadura-use-case'

class ListFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listFechaduraUseCase = container.resolve(ListFechaduraUseCase)

    const fechaduras = await listFechaduraUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(fechaduras)
  }
}

export { ListFechaduraController }
