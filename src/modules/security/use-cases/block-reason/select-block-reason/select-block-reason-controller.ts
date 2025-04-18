import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectBlockReasonUseCase } from './select-block-reason-use-case'

class SelectBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectBlockReasonUseCase = container.resolve(SelectBlockReasonUseCase)

    const blockReasons = await selectBlockReasonUseCase.execute({
      filter: filter as string,
    })

    return response.json(blockReasons)
  }
}

export { SelectBlockReasonController }
