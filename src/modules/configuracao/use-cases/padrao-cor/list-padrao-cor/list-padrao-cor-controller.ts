import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPadraoCorUseCase } from './list-padrao-cor-use-case'

class ListPadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPadraoCorUseCase = container.resolve(ListPadraoCorUseCase)

    const padroesCores = await listPadraoCorUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(padroesCores)
  }
}

export { ListPadraoCorController }
