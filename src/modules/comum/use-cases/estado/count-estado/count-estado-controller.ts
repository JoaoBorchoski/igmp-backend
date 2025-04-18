import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountEstadoUseCase } from './count-estado-use-case'

class CountEstadoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countEstadoUseCase = container.resolve(CountEstadoUseCase)

    const estadosCount = await countEstadoUseCase.execute({
      search: search as string
    })

    return response.status(estadosCount.statusCode).json(estadosCount)
  }
}

export { CountEstadoController }
