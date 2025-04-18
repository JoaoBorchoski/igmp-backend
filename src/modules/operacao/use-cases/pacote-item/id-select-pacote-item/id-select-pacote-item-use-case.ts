import { inject, injectable } from "tsyringe"
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pacoteItem = await this.pacoteItemRepository.idSelect(id)

    return pacoteItem
  }
}

export { IdSelectPacoteItemUseCase }
