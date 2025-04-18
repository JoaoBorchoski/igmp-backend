import { inject, injectable } from 'tsyringe'
import { PedidoItem } from '@modules/operacao/infra/typeorm/entities/pedido-item'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  pedidoId: string
  produto: string
  quantidade: number
  corEtiqueta: string
}

@injectable()
class UpdatePedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({
    id,
    pedidoId,
    produto,
    quantidade,
    corEtiqueta
  }: IRequest): Promise<HttpResponse> {
    const pedidoItem = await this.pedidoItemRepository.update({
      id,
      pedidoId,
      produto,
      quantidade,
      corEtiqueta
    })

    return pedidoItem
  }
}

export { UpdatePedidoItemUseCase }
