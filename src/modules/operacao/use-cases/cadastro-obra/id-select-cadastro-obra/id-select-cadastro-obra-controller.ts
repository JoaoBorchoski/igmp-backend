import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCadastroObraUseCase } from './id-select-cadastro-obra-use-case'

class IdSelectCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCadastroObraUseCase = container.resolve(IdSelectCadastroObraUseCase)

    const cadastroObra = await idSelectCadastroObraUseCase.execute({
      id: id as string
    })

    return response.json(cadastroObra.data)
  }
}

export { IdSelectCadastroObraController }
