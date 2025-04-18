import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPacoteUseCase } from './get-pacote-use-case'

class GetPacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPacoteUseCase = container.resolve(GetPacoteUseCase)
    const pacote = await getPacoteUseCase.execute(id)

    return response.status(pacote.statusCode).json(pacote.data)
  }
}

export { GetPacoteController }
