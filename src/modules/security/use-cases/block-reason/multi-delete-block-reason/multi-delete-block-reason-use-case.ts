import { inject, injectable } from 'tsyringe'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const blockReason = await this.blockReasonRepository.multiDelete(ids)

    return blockReason
  }
}

export { MultiDeleteBlockReasonUseCase }
