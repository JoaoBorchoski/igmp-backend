import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFuncionarioUseCase } from './list-funcionario-use-case'

class ListFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listFuncionarioUseCase = container.resolve(ListFuncionarioUseCase)

    const funcionarios = await listFuncionarioUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(funcionarios)
  }
}

export { ListFuncionarioController }
