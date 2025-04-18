import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSentidoAberturaUseCase } from './list-sentido-abertura-use-case'

class ListSentidoAberturaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listSentidoAberturaUseCase = container.resolve(ListSentidoAberturaUseCase)

    const sentidosAbertura = await listSentidoAberturaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(sentidosAbertura)
  }
}

export { ListSentidoAberturaController }
