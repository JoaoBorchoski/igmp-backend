import { inject, injectable } from 'tsyringe'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const pacotesItemsCount = await this.pacoteItemRepository.count(
      search,
      filter
    )

    return pacotesItemsCount
  }
}

export { CountPacoteItemUseCase }
