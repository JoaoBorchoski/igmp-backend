import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountMedicaoUseCase } from './count-medicao-use-case'

class CountMedicaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countMedicaoUseCase = container.resolve(CountMedicaoUseCase)

    const medicoesCount = await countMedicaoUseCase.execute({
      search: search as string
    })

    return response.status(medicoesCount.statusCode).json(medicoesCount)
  }
}

export { CountMedicaoController }
