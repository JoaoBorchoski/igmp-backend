import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectAlturaVaosUseCase } from './id-select-altura-vaos-use-case'

class IdSelectAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectAlturaVaosUseCase = container.resolve(IdSelectAlturaVaosUseCase)

    const alturaVaos = await idSelectAlturaVaosUseCase.execute({
      id: id as string
    })

    return response.json(alturaVaos.data)
  }
}

export { IdSelectAlturaVaosController }
