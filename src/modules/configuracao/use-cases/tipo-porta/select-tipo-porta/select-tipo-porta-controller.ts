import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTipoPortaUseCase } from './select-tipo-porta-use-case'

class SelectTipoPortaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectTipoPortaUseCase = container.resolve(SelectTipoPortaUseCase)

    const tiposPorta = await selectTipoPortaUseCase.execute({
      filter: filter as string,
    })

    return response.json(tiposPorta)
  }
}

export { SelectTipoPortaController }
