import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListNegociacaoUseCase } from './list-negociacao-use-case'

class ListNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listNegociacaoUseCase = container.resolve(ListNegociacaoUseCase)

    const negociacoes = await listNegociacaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(negociacoes)
  }
}

export { ListNegociacaoController }
