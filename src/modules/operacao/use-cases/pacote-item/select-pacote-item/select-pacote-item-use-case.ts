import { inject, injectable } from 'tsyringe'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const pacotesItems = await this.pacoteItemRepository.select(filter)

    const newPacotesItems = {
      items: pacotesItems.data,
      hasNext: false
    }

    return newPacotesItems
  }
}

export { SelectPacoteItemUseCase }
