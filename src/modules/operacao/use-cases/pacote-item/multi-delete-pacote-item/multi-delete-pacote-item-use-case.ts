import { inject, injectable } from 'tsyringe'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pacoteItem = await this.pacoteItemRepository.multiDelete(ids)

    return pacoteItem
  }
}

export { MultiDeletePacoteItemUseCase }
