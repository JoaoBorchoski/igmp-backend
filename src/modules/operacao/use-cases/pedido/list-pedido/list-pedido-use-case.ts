import { inject, injectable } from 'tsyringe'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { IPedidoDTO } from '@modules/operacao/dtos/i-pedido-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPedidoDTO[],
  hasNext: boolean
}

@injectable()
class ListPedidoUseCase {
  constructor(@inject('PedidoRepository')
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pedidos = await this.pedidoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPedidos = await this.pedidoRepository.count(
      search,
      filter
    )

    const numeroPedido = page * rowsPerPage

    const pedidosResponse = {
      items: pedidos.data,
      hasNext: numeroPedido < countPedidos.data.count
    }

    return pedidosResponse
  }
}

export { ListPedidoUseCase }
