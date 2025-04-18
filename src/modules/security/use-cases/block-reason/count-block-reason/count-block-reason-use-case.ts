import { inject, injectable } from 'tsyringe'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const blockReasonsCount = await this.blockReasonRepository.count(
      search,
      filter
    )

    return blockReasonsCount
  }
}

export { CountBlockReasonUseCase }
