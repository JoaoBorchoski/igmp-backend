import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountProfileOptionUseCase } from './count-profile-option-use-case'

class CountProfileOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countProfileOptionUseCase = container.resolve(CountProfileOptionUseCase)

    const profileOptionsCount = await countProfileOptionUseCase.execute({
      search: search as string
    })

    return response.status(profileOptionsCount.statusCode).json(profileOptionsCount)
  }
}

export { CountProfileOptionController }
