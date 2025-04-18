import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectBlockReasonUseCase } from './id-select-block-reason-use-case'

class IdSelectBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectBlockReasonUseCase = container.resolve(IdSelectBlockReasonUseCase)

    const blockReason = await idSelectBlockReasonUseCase.execute({
      id: id as string
    })

    return response.json(blockReason.data)
  }
}

export { IdSelectBlockReasonController }
