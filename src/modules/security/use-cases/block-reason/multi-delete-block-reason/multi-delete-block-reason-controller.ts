import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteBlockReasonUseCase } from './multi-delete-block-reason-use-case'
import { ListBlockReasonUseCase } from '../list-block-reason/list-block-reason-use-case'

class MultiDeleteBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteBlockReasonUseCase = container.resolve(MultiDeleteBlockReasonUseCase)
    await multiDeleteBlockReasonUseCase.execute(ids)


    // restore list with updated records

    const listBlockReasonUseCase = container.resolve(ListBlockReasonUseCase)
    const blockReasons = await listBlockReasonUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(blockReasons)
  }
}

export { MultiDeleteBlockReasonController }
