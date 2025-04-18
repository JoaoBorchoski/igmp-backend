import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCidadeUseCase } from './get-cidade-use-case'

class GetCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCidadeUseCase = container.resolve(GetCidadeUseCase)
    const cidade = await getCidadeUseCase.execute(id)

    return response.status(cidade.statusCode).json(cidade.data)
  }
}

export { GetCidadeController }
