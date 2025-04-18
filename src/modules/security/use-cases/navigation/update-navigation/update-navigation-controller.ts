import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateNavigationUseCase } from './update-navigation-use-case'

class UpdateNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      navigationDate,
      route
    } = request.body

    const { id } = request.params

    const updateNavigationUseCase = container.resolve(UpdateNavigationUseCase)

    const result = await updateNavigationUseCase.execute({
        id,
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

export { UpdateNavigationController }
