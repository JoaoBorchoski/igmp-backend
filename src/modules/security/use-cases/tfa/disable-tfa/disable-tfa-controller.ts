import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DisableTFAUseCase } from './disable-tfa-use-case'

class DisableTFAController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user

    const disableTFAUseCase = container.resolve(DisableTFAUseCase)

    await disableTFAUseCase.execute(user)

    return response.status(200).json('Success')
  }
}

export { DisableTFAController }
