import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetBlockReasonUseCase } from './get-block-reason-use-case'

class GetBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getBlockReasonUseCase = container.resolve(GetBlockReasonUseCase)
    const blockReason = await getBlockReasonUseCase.execute(id)

    return response.status(blockReason.statusCode).json(blockReason.data)
  }
}

export { GetBlockReasonController }
