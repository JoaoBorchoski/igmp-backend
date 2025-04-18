import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCepUseCase } from './create-cep-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    } = request.body

    const createCepUseCase = container.resolve(CreateCepUseCase)

    const result = await createCepUseCase.execute({
        codigoCep,
        logradouro,
        bairro,
        estadoId,
        cidadeId
      })
      .then(cepResult => {
        return cepResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCepController }
