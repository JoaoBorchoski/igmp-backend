import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCepUseCase } from './update-cep-use-case'

class UpdateCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoCep,
      logradouro,
      bairro,
      estadoId,
      cidadeId
    } = request.body

    const { id } = request.params

    const updateCepUseCase = container.resolve(UpdateCepUseCase)

    const result = await updateCepUseCase.execute({
        id,
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

export { UpdateCepController }
