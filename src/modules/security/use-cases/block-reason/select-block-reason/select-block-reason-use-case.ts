import { inject, injectable } from 'tsyringe'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectBlockReasonUseCase {
  constructor(@inject('BlockReasonRepository')
    private blockReasonRepository: IBlockReasonRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const blockReasons = await this.blockReasonRepository.select(filter)

    const newBlockReasons = {
      items: blockReasons.data,
      hasNext: false
    }

    return newBlockReasons
  }
}

export { SelectBlockReasonUseCase }
