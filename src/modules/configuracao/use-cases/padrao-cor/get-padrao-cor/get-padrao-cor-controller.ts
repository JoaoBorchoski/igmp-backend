import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPadraoCorUseCase } from './get-padrao-cor-use-case'

class GetPadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPadraoCorUseCase = container.resolve(GetPadraoCorUseCase)
    const padraoCor = await getPadraoCorUseCase.execute(id)

    return response.status(padraoCor.statusCode).json(padraoCor.data)
  }
}

export { GetPadraoCorController }
