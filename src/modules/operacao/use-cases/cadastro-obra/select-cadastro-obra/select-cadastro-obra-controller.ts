import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCadastroObraUseCase } from './select-cadastro-obra-use-case'

class SelectCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCadastroObraUseCase = container.resolve(SelectCadastroObraUseCase)

    const cadastroObras = await selectCadastroObraUseCase.execute({
      filter: filter as string,
    })

    return response.json(cadastroObras)
  }
}

export { SelectCadastroObraController }
