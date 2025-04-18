import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountAlturaVaosUseCase } from './count-altura-vaos-use-case'

class CountAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countAlturaVaosUseCase = container.resolve(CountAlturaVaosUseCase)

    const alturasVaosCount = await countAlturaVaosUseCase.execute({
      search: search as string
    })

    return response.status(alturasVaosCount.statusCode).json(alturasVaosCount)
  }
}

export { CountAlturaVaosController }
