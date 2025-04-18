import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePaisUseCase } from './create-pais-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoPais,
      nomePais
    } = request.body

    const createPaisUseCase = container.resolve(CreatePaisUseCase)

    const result = await createPaisUseCase.execute({
        codigoPais,
        nomePais
      })
      .then(paisResult => {
        return paisResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePaisController }
