import { inject, injectable } from 'tsyringe'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { IPedidoItemDTO } from '@modules/operacao/dtos/i-pedido-item-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPedidoItemDTO[],
  hasNext: boolean
}

@injectable()
class ListPedidoItemUseCase {
  constructor(@inject('PedidoItemRepository')
    private pedidoItemRepository: IPedidoItemRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pedidosItems = await this.pedidoItemRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPedidosItems = await this.pedidoItemRepository.count(
      search,
      filter
    )

    const numeroPedidoItem = page * rowsPerPage

    const pedidosItemsResponse = {
      items: pedidosItems.data,
      hasNext: numeroPedidoItem < countPedidosItems.data.count
    }

    return pedidosItemsResponse
  }
}

export { ListPedidoItemUseCase }
