import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountProfileUseCase } from './count-profile-use-case'

class CountProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countProfileUseCase = container.resolve(CountProfileUseCase)

    const profilesCount = await countProfileUseCase.execute({
      search: search as string
    })

    return response.status(profilesCount.statusCode).json(profilesCount)
  }
}

export { CountProfileController }
