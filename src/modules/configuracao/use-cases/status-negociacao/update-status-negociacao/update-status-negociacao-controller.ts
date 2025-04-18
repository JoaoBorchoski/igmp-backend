import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateStatusNegociacaoUseCase } from './update-status-negociacao-use-case'

class UpdateStatusNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateStatusNegociacaoUseCase = container.resolve(UpdateStatusNegociacaoUseCase)

    const result = await updateStatusNegociacaoUseCase.execute({
        id,
        nome,
        descricao
      })
      .then(statusNegociacaoResult => {
        return statusNegociacaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateStatusNegociacaoController }
