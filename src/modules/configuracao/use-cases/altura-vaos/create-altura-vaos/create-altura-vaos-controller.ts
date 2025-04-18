import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAlturaVaosUseCase } from './create-altura-vaos-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createAlturaVaosUseCase = container.resolve(CreateAlturaVaosUseCase)

    const result = await createAlturaVaosUseCase.execute({
        nome,
        descricao
      })
      .then(alturaVaosResult => {
        return alturaVaosResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateAlturaVaosController }
