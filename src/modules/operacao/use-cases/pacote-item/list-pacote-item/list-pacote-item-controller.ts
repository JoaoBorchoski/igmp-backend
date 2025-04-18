import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPacoteItemUseCase } from './list-pacote-item-use-case'

class ListPacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPacoteItemUseCase = container.resolve(ListPacoteItemUseCase)

    const pacotesItems = await listPacoteItemUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(pacotesItems)
  }
}

export { ListPacoteItemController }
