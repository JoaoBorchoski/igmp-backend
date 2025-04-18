import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAlizarUseCase } from './get-alizar-use-case'

class GetAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getAlizarUseCase = container.resolve(GetAlizarUseCase)
    const alizar = await getAlizarUseCase.execute(id)

    return response.status(alizar.statusCode).json(alizar.data)
  }
}

export { GetAlizarController }
