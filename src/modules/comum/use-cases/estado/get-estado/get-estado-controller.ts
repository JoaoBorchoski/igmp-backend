import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEstadoUseCase } from './get-estado-use-case'

class GetEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getEstadoUseCase = container.resolve(GetEstadoUseCase)
    const estado = await getEstadoUseCase.execute(id)

    return response.status(estado.statusCode).json(estado.data)
  }
}

export { GetEstadoController }
