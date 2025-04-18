import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetClienteUseCase } from './get-cliente-use-case'

class GetClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getClienteUseCase = container.resolve(GetClienteUseCase)
    const cliente = await getClienteUseCase.execute(id)

    return response.status(cliente.statusCode).json(cliente.data)
  }
}

export { GetClienteController }
