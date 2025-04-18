import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCepUseCase } from './id-select-cep-use-case'

class IdSelectCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCepUseCase = container.resolve(IdSelectCepUseCase)

    const cep = await idSelectCepUseCase.execute({
      id: id as string
    })

    return response.json(cep.data)
  }
}

export { IdSelectCepController }
