import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAlizarUseCase } from './create-alizar-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createAlizarUseCase = container.resolve(CreateAlizarUseCase)

    const result = await createAlizarUseCase.execute({
        nome,
        descricao
      })
      .then(alizarResult => {
        return alizarResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateAlizarController }
