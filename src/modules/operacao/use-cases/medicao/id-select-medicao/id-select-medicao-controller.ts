import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectMedicaoUseCase } from './id-select-medicao-use-case'

class IdSelectMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectMedicaoUseCase = container.resolve(IdSelectMedicaoUseCase)

    const medicao = await idSelectMedicaoUseCase.execute({
      id: id as string
    })

    return response.json(medicao.data)
  }
}

export { IdSelectMedicaoController }
