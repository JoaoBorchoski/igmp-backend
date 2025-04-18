import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPacoteUseCase } from './id-select-pacote-use-case'

class IdSelectPacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPacoteUseCase = container.resolve(IdSelectPacoteUseCase)

    const pacote = await idSelectPacoteUseCase.execute({
      id: id as string
    })

    return response.json(pacote.data)
  }
}

export { IdSelectPacoteController }
