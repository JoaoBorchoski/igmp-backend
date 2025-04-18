import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTipoEnchimentoUseCase } from './count-tipo-enchimento-use-case'

class CountTipoEnchimentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTipoEnchimentoUseCase = container.resolve(CountTipoEnchimentoUseCase)

    const tiposEnchimentoCount = await countTipoEnchimentoUseCase.execute({
      search: search as string
    })

    return response.status(tiposEnchimentoCount.statusCode).json(tiposEnchimentoCount)
  }
}

export { CountTipoEnchimentoController }
