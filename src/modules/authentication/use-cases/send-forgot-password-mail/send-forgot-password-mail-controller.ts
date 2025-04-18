import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SendForgotPasswordMailUseCase } from './send-forgot-password-mail-use-case'

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { login } = request.body

    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)

    await sendForgotPasswordMailUseCase.execute(login)

    return response.send()
  }
}

export { SendForgotPasswordMailController }
