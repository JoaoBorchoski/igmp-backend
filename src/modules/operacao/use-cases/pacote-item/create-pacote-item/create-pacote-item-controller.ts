import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePacoteItemUseCase } from './create-pacote-item-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePacoteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pacoteId,
      produto,
      quantidade
    } = request.body

    const createPacoteItemUseCase = container.resolve(CreatePacoteItemUseCase)

    const result = await createPacoteItemUseCase.execute({
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

export { CreatePacoteItemController }
