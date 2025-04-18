import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectLarguraVaosUseCase } from './select-largura-vaos-use-case'

class SelectLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectLarguraVaosUseCase = container.resolve(SelectLarguraVaosUseCase)

    const largurasVaos = await selectLarguraVaosUseCase.execute({
      filter: filter as string,
    })

    return response.json(largurasVaos)
  }
}

export { SelectLarguraVaosController }
