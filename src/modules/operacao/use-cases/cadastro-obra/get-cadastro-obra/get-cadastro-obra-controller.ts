import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCadastroObraUseCase } from './get-cadastro-obra-use-case'

class GetCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCadastroObraUseCase = container.resolve(GetCadastroObraUseCase)
    const cadastroObra = await getCadastroObraUseCase.execute(id)

    return response.status(cadastroObra.statusCode).json(cadastroObra.data)
  }
}

export { GetCadastroObraController }
