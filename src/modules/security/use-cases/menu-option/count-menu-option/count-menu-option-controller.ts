import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountMenuOptionUseCase } from './count-menu-option-use-case'

class CountMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countMenuOptionUseCase = container.resolve(CountMenuOptionUseCase)

    const menuOptionsCount = await countMenuOptionUseCase.execute({
      search: search as string
    })

    return response.status(menuOptionsCount.statusCode).json(menuOptionsCount)
  }
}

export { CountMenuOptionController }
