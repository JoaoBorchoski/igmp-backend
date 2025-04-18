import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPaisUseCase } from './id-select-pais-use-case'

class IdSelectPaisController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPaisUseCase = container.resolve(IdSelectPaisUseCase)

    const pais = await idSelectPaisUseCase.execute({
      id: id as string
    })

    return response.json(pais.data)
  }
}

export { IdSelectPaisController }
