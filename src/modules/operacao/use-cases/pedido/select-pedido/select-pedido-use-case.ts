import { inject, injectable } from 'tsyringe'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const pedidos = await this.pedidoRepository.select(filter)

    const newPedidos = {
      items: pedidos.data,
      hasNext: false
    }

    return newPedidos
  }
}

export { SelectPedidoUseCase }
