import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectAlturaVaosUseCase } from './select-altura-vaos-use-case'

class SelectAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectAlturaVaosUseCase = container.resolve(SelectAlturaVaosUseCase)

    const alturasVaos = await selectAlturaVaosUseCase.execute({
      filter: filter as string,
    })

    return response.json(alturasVaos)
  }
}

export { SelectAlturaVaosController }
