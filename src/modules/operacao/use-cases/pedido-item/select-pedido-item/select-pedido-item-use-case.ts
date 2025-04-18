import { inject, injectable } from 'tsyringe'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const pedidosItems = await this.pedidoItemRepository.select(filter)

    const newPedidosItems = {
      items: pedidosItems.data,
      hasNext: false
    }

    return newPedidosItems
  }
}

export { SelectPedidoItemUseCase }
