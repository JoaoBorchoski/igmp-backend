import { inject, injectable } from 'tsyringe'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { ITipoEnchimentoDTO } from '@modules/configuracao/dtos/i-tipo-enchimento-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ITipoEnchimentoDTO[],
  hasNext: boolean
}

@injectable()
class ListTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tiposEnchimento = await this.tipoEnchimentoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countTiposEnchimento = await this.tipoEnchimentoRepository.count(
      search,
      filter
    )

    const numeroTipoEnchimento = page * rowsPerPage

    const tiposEnchimentoResponse = {
      items: tiposEnchimento.data,
      hasNext: numeroTipoEnchimento < countTiposEnchimento.data.count
    }

    return tiposEnchimentoResponse
  }
}

export { ListTipoEnchimentoUseCase }
