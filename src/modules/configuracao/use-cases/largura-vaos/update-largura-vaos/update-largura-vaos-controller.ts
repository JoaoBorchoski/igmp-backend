import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateLarguraVaosUseCase } from './update-largura-vaos-use-case'

class UpdateLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateLarguraVaosUseCase = container.resolve(UpdateLarguraVaosUseCase)

    const result = await updateLarguraVaosUseCase.execute({
        id,
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

export { UpdateLarguraVaosController }
