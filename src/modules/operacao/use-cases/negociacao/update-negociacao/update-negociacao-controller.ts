import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateNegociacaoUseCase } from './update-negociacao-use-case'

class UpdateNegociacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      medicaoId,
      clienteId,
      statusNegociacaoId,
      funcionarioId,
      dataCriacao,
      dataFechamento,
      valorEstimado,
      descricao,
      motivoPerda
    } = request.body

    const { id } = request.params

    const updateNegociacaoUseCase = container.resolve(UpdateNegociacaoUseCase)

    const result = await updateNegociacaoUseCase.execute({
        id,
        medicaoId,
        clienteId,
        statusNegociacaoId,
        funcionarioId,
        dataCriacao,
        dataFechamento,
        valorEstimado,
        descricao,
        motivoPerda
      })
      .then(negociacaoResult => {
        return negociacaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateNegociacaoController }
