import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetLarguraVaosUseCase } from './get-largura-vaos-use-case'

class GetLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getLarguraVaosUseCase = container.resolve(GetLarguraVaosUseCase)
    const larguraVaos = await getLarguraVaosUseCase.execute(id)

    return response.status(larguraVaos.statusCode).json(larguraVaos.data)
  }
}

export { GetLarguraVaosController }
