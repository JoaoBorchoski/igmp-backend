import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCadastroObraUseCase } from './list-cadastro-obra-use-case'

class ListCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCadastroObraUseCase = container.resolve(ListCadastroObraUseCase)

    const cadastroObras = await listCadastroObraUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(cadastroObras)
  }
}

export { ListCadastroObraController }
