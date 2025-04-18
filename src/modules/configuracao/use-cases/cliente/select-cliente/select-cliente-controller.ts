import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectClienteUseCase } from './select-cliente-use-case'

class SelectClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectClienteUseCase = container.resolve(SelectClienteUseCase)

    const clientes = await selectClienteUseCase.execute({
      filter: filter as string,
    })

    return response.json(clientes)
  }
}

export { SelectClienteController }
