import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetMedicaoUseCase } from './get-medicao-use-case'

class GetMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getMedicaoUseCase = container.resolve(GetMedicaoUseCase)
    const medicao = await getMedicaoUseCase.execute(id)

    return response.status(medicao.statusCode).json(medicao.data)
  }
}

export { GetMedicaoController }
