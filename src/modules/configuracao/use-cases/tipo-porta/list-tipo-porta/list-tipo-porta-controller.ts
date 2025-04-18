import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoPortaUseCase } from './list-tipo-porta-use-case'

class ListTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listTipoPortaUseCase = container.resolve(ListTipoPortaUseCase)

    const tiposPorta = await listTipoPortaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(tiposPorta)
  }
}

export { ListTipoPortaController }
