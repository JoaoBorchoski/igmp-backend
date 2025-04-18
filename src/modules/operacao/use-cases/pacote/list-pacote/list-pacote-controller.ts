import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPacoteUseCase } from './list-pacote-use-case'

class ListPacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPacoteUseCase = container.resolve(ListPacoteUseCase)

    const pacotes = await listPacoteUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(pacotes)
  }
}

export { ListPacoteController }
