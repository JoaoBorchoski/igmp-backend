import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountNavigationUseCase } from './count-navigation-use-case'

class CountNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countNavigationUseCase = container.resolve(CountNavigationUseCase)

    const navigationsCount = await countNavigationUseCase.execute({
      search: search as string
    })

    return response.status(navigationsCount.statusCode).json(navigationsCount)
  }
}

export { CountNavigationController }
