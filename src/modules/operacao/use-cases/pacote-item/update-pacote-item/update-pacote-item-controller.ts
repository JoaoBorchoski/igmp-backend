import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePacoteItemUseCase } from './update-pacote-item-use-case'

class UpdatePacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pacoteId,
      produto,
      quantidade
    } = request.body

    const { id } = request.params

    const updatePacoteItemUseCase = container.resolve(UpdatePacoteItemUseCase)

    const result = await updatePacoteItemUseCase.execute({
        id,
        pacoteId,
        produto,
        quantidade
      })
      .then(pacoteItemResult => {
        return pacoteItemResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePacoteItemController }
