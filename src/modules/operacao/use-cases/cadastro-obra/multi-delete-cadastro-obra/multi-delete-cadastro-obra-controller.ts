import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCadastroObraUseCase } from './multi-delete-cadastro-obra-use-case'
import { ListCadastroObraUseCase } from '../list-cadastro-obra/list-cadastro-obra-use-case'

class MultiDeleteCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCadastroObraUseCase = container.resolve(MultiDeleteCadastroObraUseCase)
    await multiDeleteCadastroObraUseCase.execute(ids)


    // restore list with updated records

    const listCadastroObraUseCase = container.resolve(ListCadastroObraUseCase)
    const cadastroObras = await listCadastroObraUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(cadastroObras)
  }
}

export { MultiDeleteCadastroObraController }
