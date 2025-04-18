import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  code: string
  description: string
  instructionsToSolve: string
  isSolvedByPasswordReset: boolean
  disabled: boolean
}

@injectable()
class CreateBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({
    code,
    description,
    instructionsToSolve,
    isSolvedByPasswordReset,
    disabled
  }: IRequest): Promise<BlockReason> {
    const result = await this.blockReasonRepository.create({
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

    return result
  }
}

export { CreateBlockReasonUseCase }
