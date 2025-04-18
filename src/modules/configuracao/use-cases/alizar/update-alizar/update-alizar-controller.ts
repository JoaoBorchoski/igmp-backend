import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAlizarUseCase } from './update-alizar-use-case'

class UpdateAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateAlizarUseCase = container.resolve(UpdateAlizarUseCase)

    const result = await updateAlizarUseCase.execute({
        id,
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

export { UpdateAlizarController }
