import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListEstadoUseCase } from './list-estado-use-case'

class ListEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listEstadoUseCase = container.resolve(ListEstadoUseCase)

    const estados = await listEstadoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(estados)
  }
}

export { ListEstadoController }
