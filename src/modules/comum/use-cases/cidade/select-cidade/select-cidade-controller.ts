import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCidadeUseCase } from './select-cidade-use-case'

class SelectCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, estadoId } = request.query

    const selectCidadeUseCase = container.resolve(SelectCidadeUseCase)

    const cidades = await selectCidadeUseCase.execute({
      filter: filter as string,
      estadoId: estadoId as string
    })

    return response.json(cidades)
  }
}

export { SelectCidadeController }
