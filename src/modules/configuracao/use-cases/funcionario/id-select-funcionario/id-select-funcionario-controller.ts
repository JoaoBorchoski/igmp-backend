import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFuncionarioUseCase } from './id-select-funcionario-use-case'

class IdSelectFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFuncionarioUseCase = container.resolve(IdSelectFuncionarioUseCase)

    const funcionario = await idSelectFuncionarioUseCase.execute({
      id: id as string
    })

    return response.json(funcionario.data)
  }
}

export { IdSelectFuncionarioController }
