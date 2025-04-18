import { inject, injectable } from "tsyringe"
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const blockReason = await this.blockReasonRepository.idSelect(id)

    return blockReason
  }
}

export { IdSelectBlockReasonUseCase }
