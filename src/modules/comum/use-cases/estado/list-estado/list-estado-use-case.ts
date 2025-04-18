import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { IEstadoDTO } from '@modules/comum/dtos/i-estado-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IEstadoDTO[],
  hasNext: boolean
}

@injectable()
class ListEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const estados = await this.estadoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countEstados = await this.estadoRepository.count(
      search,
      filter
    )

    const numeroEstado = page * rowsPerPage

    const estadosResponse = {
      items: estados.data,
      hasNext: numeroEstado < countEstados.data.count
    }

    return estadosResponse
  }
}

export { ListEstadoUseCase }
