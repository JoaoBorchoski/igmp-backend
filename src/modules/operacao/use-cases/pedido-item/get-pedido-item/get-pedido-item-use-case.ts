import { inject, injectable } from 'tsyringe'
import { PedidoItem } from '@modules/operacao/infra/typeorm/entities/pedido-item'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pedidoItem = await this.pedidoItemRepository.get(id)

    return pedidoItem
  }
}

export { GetPedidoItemUseCase }
