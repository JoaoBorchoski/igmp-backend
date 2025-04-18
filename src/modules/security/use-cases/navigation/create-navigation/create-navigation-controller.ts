import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNavigationUseCase } from './create-navigation-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      navigationDate,
      route
    } = request.body

    const createNavigationUseCase = container.resolve(CreateNavigationUseCase)

    const result = await createNavigationUseCase.execute({
        userId,
        navigationDate,
        route
      })
      .then(navigationResult => {
        return navigationResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateNavigationController }
