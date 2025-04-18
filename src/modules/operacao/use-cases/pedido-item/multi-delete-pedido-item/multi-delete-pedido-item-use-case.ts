import { inject, injectable } from 'tsyringe'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pedidoItem = await this.pedidoItemRepository.multiDelete(ids)

    return pedidoItem
  }
}

export { MultiDeletePedidoItemUseCase }
