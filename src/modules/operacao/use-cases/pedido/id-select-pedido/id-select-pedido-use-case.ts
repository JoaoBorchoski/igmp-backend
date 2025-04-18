import { inject, injectable } from "tsyringe"
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pedido = await this.pedidoRepository.idSelect(id)

    return pedido
  }
}

export { IdSelectPedidoUseCase }
