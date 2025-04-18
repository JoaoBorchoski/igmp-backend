import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectMedicaoUseCase } from './select-medicao-use-case'

class SelectMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectMedicaoUseCase = container.resolve(SelectMedicaoUseCase)

    const medicoes = await selectMedicaoUseCase.execute({
      filter: filter as string,
    })

    return response.json(medicoes)
  }
}

export { SelectMedicaoController }
