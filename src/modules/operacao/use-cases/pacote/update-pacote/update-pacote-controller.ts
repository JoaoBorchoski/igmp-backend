import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePacoteUseCase } from './update-pacote-use-case'

class UpdatePacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pedidoId,
      descricao
    } = request.body

    const { id } = request.params

    const updatePacoteUseCase = container.resolve(UpdatePacoteUseCase)

    const result = await updatePacoteUseCase.execute({
        id,
        pedidoId,
        descricao
      })
      .then(pacoteResult => {
        return pacoteResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePacoteController }
