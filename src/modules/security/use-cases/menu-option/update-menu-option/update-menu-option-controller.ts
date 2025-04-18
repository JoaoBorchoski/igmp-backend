import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateMenuOptionUseCase } from './update-menu-option-use-case'

class UpdateMenuOptionController {
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

    const { id } = request.params

    const updateMenuOptionUseCase = container.resolve(UpdateMenuOptionUseCase)

    const result = await updateMenuOptionUseCase.execute({
        id,
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

export { UpdateMenuOptionController }
