import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPacoteUseCase } from './select-pacote-use-case'

class SelectPacoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPacoteUseCase = container.resolve(SelectPacoteUseCase)

    const pacotes = await selectPacoteUseCase.execute({
      filter: filter as string,
    })

    return response.json(pacotes)
  }
}

export { SelectPacoteController }
