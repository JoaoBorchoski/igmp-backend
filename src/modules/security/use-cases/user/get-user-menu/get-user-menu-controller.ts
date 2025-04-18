import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserMenuUseCase } from './get-user-menu-use-case'

class GetUserMenuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user

    const getUserMenuUseCase = container.resolve(GetUserMenuUseCase)

    const userMenu = await getUserMenuUseCase.execute({ user })

    return response.json(userMenu)
  }
}

export { GetUserMenuController }
