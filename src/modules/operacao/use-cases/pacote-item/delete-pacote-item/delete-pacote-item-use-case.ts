import { inject, injectable } from 'tsyringe'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pacoteItem = await this.pacoteItemRepository.delete(id)

    return pacoteItem
  }
}

export { DeletePacoteItemUseCase }
