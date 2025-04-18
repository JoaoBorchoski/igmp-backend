import { inject, injectable } from 'tsyringe'
import { PedidoItem } from '@modules/operacao/infra/typeorm/entities/pedido-item'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  pedidoId: string
  produto: string
  quantidade: number
  corEtiqueta: string
}

@injectable()
class CreatePedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({
    pedidoId,
    produto,
    quantidade,
    corEtiqueta
  }: IRequest): Promise<PedidoItem> {
    const result = await this.pedidoItemRepository.create({
        pedidoId,
        produto,
        quantidade,
        corEtiqueta
      })
      .then(pedidoItemResult => {
        return pedidoItemResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePedidoItemUseCase }
