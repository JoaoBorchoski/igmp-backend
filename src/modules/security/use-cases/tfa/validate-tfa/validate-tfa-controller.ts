import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ValidateTFAUseCase } from './validate-tfa-use-case'

class ValidateTFAController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code, login } = request.body

    const validateTFAUseCase = container.resolve(ValidateTFAUseCase)

    await validateTFAUseCase.execute(code, login)

    return response.status(200).json('Success')
  }
}

export { ValidateTFAController }
