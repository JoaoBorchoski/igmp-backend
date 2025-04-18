import { inject, injectable } from 'tsyringe'
import { PedidoItem } from '@modules/operacao/infra/typeorm/entities/pedido-item'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const pedidosItemsCount = await this.pedidoItemRepository.count(
      search,
      filter
    )

    return pedidosItemsCount
  }
}

export { CountPedidoItemUseCase }
