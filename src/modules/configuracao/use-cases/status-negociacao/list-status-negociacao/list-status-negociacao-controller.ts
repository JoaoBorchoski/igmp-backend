import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListStatusNegociacaoUseCase } from './list-status-negociacao-use-case'

class ListStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listStatusNegociacaoUseCase = container.resolve(ListStatusNegociacaoUseCase)

    const statusNegociacoes = await listStatusNegociacaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(statusNegociacoes)
  }
}

export { ListStatusNegociacaoController }
