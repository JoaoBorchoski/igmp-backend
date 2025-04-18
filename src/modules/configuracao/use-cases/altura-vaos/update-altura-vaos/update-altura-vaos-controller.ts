import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAlturaVaosUseCase } from './update-altura-vaos-use-case'

class UpdateAlturaVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateAlturaVaosUseCase = container.resolve(UpdateAlturaVaosUseCase)

    const result = await updateAlturaVaosUseCase.execute({
        id,
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

export { UpdateAlturaVaosController }
