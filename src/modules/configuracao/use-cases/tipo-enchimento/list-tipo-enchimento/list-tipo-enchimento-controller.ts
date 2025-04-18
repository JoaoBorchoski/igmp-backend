import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoEnchimentoUseCase } from './list-tipo-enchimento-use-case'

class ListTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listTipoEnchimentoUseCase = container.resolve(ListTipoEnchimentoUseCase)

    const tiposEnchimento = await listTipoEnchimentoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(tiposEnchimento)
  }
}

export { ListTipoEnchimentoController }
