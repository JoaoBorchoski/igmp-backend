import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAlturaVaosUseCase } from './get-altura-vaos-use-case'

class GetAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getAlturaVaosUseCase = container.resolve(GetAlturaVaosUseCase)
    const alturaVaos = await getAlturaVaosUseCase.execute(id)

    return response.status(alturaVaos.statusCode).json(alturaVaos.data)
  }
}

export { GetAlturaVaosController }
