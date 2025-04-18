import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateMenuOptionUseCase } from './create-menu-option-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      moduleId,
      sequence,
      label,
      route,
      icon,
      key,
      disabled
    } = request.body

    const createMenuOptionUseCase = container.resolve(CreateMenuOptionUseCase)

    const result = await createMenuOptionUseCase.execute({
        moduleId,
        sequence,
        label,
        route,
        icon,
        key,
        disabled
      })
      .then(menuOptionResult => {
        return menuOptionResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateMenuOptionController }
