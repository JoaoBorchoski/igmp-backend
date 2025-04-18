import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './create-user-use-case'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userGroupId,
      name,
      login,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      mustActiveTwoFactorAuthentication,
      avatar,
      disabled
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const result = await createUserUseCase.execute({
        userGroupId,
        name,
        login,
        password,
        isAdmin,
        isSuperUser,
        isBlocked,
        blockReasonId,
        mustChangePasswordNextLogon,
        mustActiveTwoFactorAuthentication,
        avatar,
        isDisabled: disabled
      })
      .then(userResult => {
        return userResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateUserController }
