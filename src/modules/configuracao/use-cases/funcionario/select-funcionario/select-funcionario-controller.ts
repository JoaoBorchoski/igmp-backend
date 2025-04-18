import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFuncionarioUseCase } from './select-funcionario-use-case'

class SelectFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectFuncionarioUseCase = container.resolve(SelectFuncionarioUseCase)

    const funcionarios = await selectFuncionarioUseCase.execute({
      filter: filter as string,
    })

    return response.json(funcionarios)
  }
}

export { SelectFuncionarioController }
