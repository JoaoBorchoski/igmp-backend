import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCepUseCase } from './list-cep-use-case'

class ListCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCepUseCase = container.resolve(ListCepUseCase)

    const ceps = await listCepUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(ceps)
  }
}

export { ListCepController }
