import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCepUseCase } from './get-cep-use-case'

class GetCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCepUseCase = container.resolve(GetCepUseCase)
    const cep = await getCepUseCase.execute(id)

    return response.status(cep.statusCode).json(cep.data)
  }
}

export { GetCepController }
