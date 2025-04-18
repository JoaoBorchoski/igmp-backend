import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCepUseCase } from './select-cep-use-case'

class SelectCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCepUseCase = container.resolve(SelectCepUseCase)

    const ceps = await selectCepUseCase.execute({
      filter: filter as string,
    })

    return response.json(ceps)
  }
}

export { SelectCepController }
