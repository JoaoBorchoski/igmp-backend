import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetMenuOptionUseCase } from './get-menu-option-use-case'

class GetMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getMenuOptionUseCase = container.resolve(GetMenuOptionUseCase)
    const menuOption = await getMenuOptionUseCase.execute(id)

    return response.status(menuOption.statusCode).json(menuOption.data)
  }
}

export { GetMenuOptionController }
