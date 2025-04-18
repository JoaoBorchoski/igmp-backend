import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountBlockReasonUseCase } from './count-block-reason-use-case'

class CountBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countBlockReasonUseCase = container.resolve(CountBlockReasonUseCase)

    const blockReasonsCount = await countBlockReasonUseCase.execute({
      search: search as string
    })

    return response.status(blockReasonsCount.statusCode).json(blockReasonsCount)
  }
}

export { CountBlockReasonController }
