import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPadraoCorUseCase } from './id-select-padrao-cor-use-case'

class IdSelectPadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPadraoCorUseCase = container.resolve(IdSelectPadraoCorUseCase)

    const padraoCor = await idSelectPadraoCorUseCase.execute({
      id: id as string
    })

    return response.json(padraoCor.data)
  }
}

export { IdSelectPadraoCorController }
