import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCadastroObraUseCase } from './count-cadastro-obra-use-case'

class CountCadastroObraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCadastroObraUseCase = container.resolve(CountCadastroObraUseCase)

    const cadastroObrasCount = await countCadastroObraUseCase.execute({
      search: search as string
    })

    return response.status(cadastroObrasCount.statusCode).json(cadastroObrasCount)
  }
}

export { CountCadastroObraController }
