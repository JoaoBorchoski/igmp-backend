import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, login } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUserUseCase.execute({
      password,
      login,
    })

    return response.json(token)
  }
}

export { AuthenticateUserController }
