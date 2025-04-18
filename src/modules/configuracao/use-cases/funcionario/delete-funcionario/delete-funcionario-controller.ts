import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFuncionarioUseCase } from './delete-funcionario-use-case'
import { ListFuncionarioUseCase } from '../list-funcionario/list-funcionario-use-case'

class DeleteFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteFuncionarioUseCase = container.resolve(DeleteFuncionarioUseCase)
    await deleteFuncionarioUseCase.execute(id)


    // restore list with updated records

    const listFuncionarioUseCase = container.resolve(ListFuncionarioUseCase)
    const funcionarios = await listFuncionarioUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(funcionarios)
  }
}

export { DeleteFuncionarioController }
