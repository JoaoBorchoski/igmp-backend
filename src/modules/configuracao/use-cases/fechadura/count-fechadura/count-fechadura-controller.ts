import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFechaduraUseCase } from './count-fechadura-use-case'

class CountFechaduraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFechaduraUseCase = container.resolve(CountFechaduraUseCase)

    const fechadurasCount = await countFechaduraUseCase.execute({
      search: search as string
    })

    return response.status(fechadurasCount.statusCode).json(fechadurasCount)
  }
}

export { CountFechaduraController }
