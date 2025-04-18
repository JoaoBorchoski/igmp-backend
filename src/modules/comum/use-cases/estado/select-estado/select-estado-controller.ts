import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectEstadoUseCase } from './select-estado-use-case'

class SelectEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectEstadoUseCase = container.resolve(SelectEstadoUseCase)

    const estados = await selectEstadoUseCase.execute({
      filter: filter as string,
    })

    return response.json(estados)
  }
}

export { SelectEstadoController }
