import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFuncionarioUseCase } from './multi-delete-funcionario-use-case'
import { ListFuncionarioUseCase } from '../list-funcionario/list-funcionario-use-case'

class MultiDeleteFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFuncionarioUseCase = container.resolve(MultiDeleteFuncionarioUseCase)
    await multiDeleteFuncionarioUseCase.execute(ids)


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

export { MultiDeleteFuncionarioController }
