import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectEstadoUseCase } from './id-select-estado-use-case'

class IdSelectEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectEstadoUseCase = container.resolve(IdSelectEstadoUseCase)

    const estado = await idSelectEstadoUseCase.execute({
      id: id as string
    })

    return response.json(estado.data)
  }
}

export { IdSelectEstadoController }
