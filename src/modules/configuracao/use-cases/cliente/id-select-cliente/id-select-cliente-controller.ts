import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectClienteUseCase } from './id-select-cliente-use-case'

class IdSelectClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectClienteUseCase = container.resolve(IdSelectClienteUseCase)

    const cliente = await idSelectClienteUseCase.execute({
      id: id as string
    })

    return response.json(cliente.data)
  }
}

export { IdSelectClienteController }
