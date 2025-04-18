import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCidadeUseCase } from './id-select-cidade-use-case'

class IdSelectCidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCidadeUseCase = container.resolve(IdSelectCidadeUseCase)

    const cidade = await idSelectCidadeUseCase.execute({
      id: id as string
    })

    return response.json(cidade.data)
  }
}

export { IdSelectCidadeController }
