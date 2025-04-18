import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFuncionarioUseCase } from './count-funcionario-use-case'

class CountFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFuncionarioUseCase = container.resolve(CountFuncionarioUseCase)

    const funcionariosCount = await countFuncionarioUseCase.execute({
      search: search as string
    })

    return response.status(funcionariosCount.statusCode).json(funcionariosCount)
  }
}

export { CountFuncionarioController }
