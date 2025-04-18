import { inject, injectable } from 'tsyringe'
import { Pedido } from '@modules/operacao/infra/typeorm/entities/pedido'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const pedidosCount = await this.pedidoRepository.count(
      search,
      filter
    )

    return pedidosCount
  }
}

export { CountPedidoUseCase }
