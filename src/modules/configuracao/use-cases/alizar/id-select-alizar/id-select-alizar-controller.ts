import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectAlizarUseCase } from './id-select-alizar-use-case'

class IdSelectAlizarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectAlizarUseCase = container.resolve(IdSelectAlizarUseCase)

    const alizar = await idSelectAlizarUseCase.execute({
      id: id as string
    })

    return response.json(alizar.data)
  }
}

export { IdSelectAlizarController }
