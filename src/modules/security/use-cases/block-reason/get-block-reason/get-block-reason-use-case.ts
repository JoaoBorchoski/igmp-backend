import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const blockReason = await this.blockReasonRepository.get(id)

    const newBlockReason = {
      statusCode: blockReason.statusCode,
      data: {
        id: blockReason.data.id,
        code: blockReason.data.code,
        description: blockReason.data.description,
        instructionsToSolve: blockReason.data.instructionsToSolve,
        isSolvedByPasswordReset: blockReason.data.isSolvedByPasswordReset,
        disabled: blockReason.data.disabled,
      }
    }

    return newBlockReason
  }
}

export { GetBlockReasonUseCase }
