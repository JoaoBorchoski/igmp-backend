import { inject, injectable } from 'tsyringe'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pedido = await this.pedidoRepository.multiDelete(ids)

    return pedido
  }
}

export { MultiDeletePedidoUseCase }
