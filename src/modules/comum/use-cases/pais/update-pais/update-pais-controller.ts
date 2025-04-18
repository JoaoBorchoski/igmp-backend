import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePaisUseCase } from './update-pais-use-case'

class UpdatePaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoPais,
      nomePais
    } = request.body

    const { id } = request.params

    const updatePaisUseCase = container.resolve(UpdatePaisUseCase)

    const result = await updatePaisUseCase.execute({
        id,
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

export { UpdatePaisController }
