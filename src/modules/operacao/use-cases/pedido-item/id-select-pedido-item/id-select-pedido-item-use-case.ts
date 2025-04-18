import { inject, injectable } from "tsyringe"
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pedidoItem = await this.pedidoItemRepository.idSelect(id)

    return pedidoItem
  }
}

export { IdSelectPedidoItemUseCase }
