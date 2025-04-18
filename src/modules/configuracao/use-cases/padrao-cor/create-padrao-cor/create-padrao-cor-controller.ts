import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePadraoCorUseCase } from './create-padrao-cor-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createPadraoCorUseCase = container.resolve(CreatePadraoCorUseCase)

    const result = await createPadraoCorUseCase.execute({
        nome,
        descricao
      })
      .then(padraoCorResult => {
        return padraoCorResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePadraoCorController }
