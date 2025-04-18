import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCadastroObraUseCase } from './delete-cadastro-obra-use-case'
import { ListCadastroObraUseCase } from '../list-cadastro-obra/list-cadastro-obra-use-case'

class DeleteCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCadastroObraUseCase = container.resolve(DeleteCadastroObraUseCase)
    await deleteCadastroObraUseCase.execute(id)


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

export { DeleteCadastroObraController }
