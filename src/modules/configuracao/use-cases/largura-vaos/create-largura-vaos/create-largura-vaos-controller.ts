import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLarguraVaosUseCase } from './create-largura-vaos-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const createLarguraVaosUseCase = container.resolve(CreateLarguraVaosUseCase)

    const result = await createLarguraVaosUseCase.execute({
        nome,
        descricao
      })
      .then(larguraVaosResult => {
        return larguraVaosResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateLarguraVaosController }
