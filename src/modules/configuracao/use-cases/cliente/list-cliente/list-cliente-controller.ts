import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListClienteUseCase } from './list-cliente-use-case'

class ListClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listClienteUseCase = container.resolve(ListClienteUseCase)

    const clientes = await listClienteUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(clientes)
  }
}

export { ListClienteController }
