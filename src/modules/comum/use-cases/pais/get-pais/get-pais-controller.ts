import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPaisUseCase } from './get-pais-use-case'

class GetPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPaisUseCase = container.resolve(GetPaisUseCase)
    const pais = await getPaisUseCase.execute(id)

    return response.status(pais.statusCode).json(pais.data)
  }
}

export { GetPaisController }
