import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateBlockReasonUseCase } from './create-block-reason-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateBlockReasonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      code,
      description,
      instructionsToSolve,
      isSolvedByPasswordReset,
      disabled
    } = request.body

    const createBlockReasonUseCase = container.resolve(CreateBlockReasonUseCase)

    const result = await createBlockReasonUseCase.execute({
        code,
        description,
        instructionsToSolve,
        isSolvedByPasswordReset,
        disabled
      })
      .then(blockReasonResult => {
        return blockReasonResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateBlockReasonController }
