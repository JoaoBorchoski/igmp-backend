import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListMedicaoUseCase } from './list-medicao-use-case'

class ListMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listMedicaoUseCase = container.resolve(ListMedicaoUseCase)

    const medicoes = await listMedicaoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(medicoes)
  }
}

export { ListMedicaoController }
