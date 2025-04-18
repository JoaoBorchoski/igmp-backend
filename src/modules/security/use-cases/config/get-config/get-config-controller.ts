import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetConfigUseCase } from './get-config-use-case'

class GetConfigController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body
    const getConfigUseCase = container.resolve(GetConfigUseCase)
    const config = await getConfigUseCase.execute(title)

    return response.status(config.statusCode).json(config)
  }
}

export { GetConfigController }
