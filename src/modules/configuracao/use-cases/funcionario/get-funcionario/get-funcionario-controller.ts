import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFuncionarioUseCase } from './get-funcionario-use-case'

class GetFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFuncionarioUseCase = container.resolve(GetFuncionarioUseCase)
    const funcionario = await getFuncionarioUseCase.execute(id)

    return response.status(funcionario.statusCode).json(funcionario.data)
  }
}

export { GetFuncionarioController }
