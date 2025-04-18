import { inject, injectable } from 'tsyringe'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { ITipoPortaDTO } from '@modules/configuracao/dtos/i-tipo-porta-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ITipoPortaDTO[],
  hasNext: boolean
}

@injectable()
class ListTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tiposPorta = await this.tipoPortaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countTiposPorta = await this.tipoPortaRepository.count(
      search,
      filter
    )

    const numeroTipoPorta = page * rowsPerPage

    const tiposPortaResponse = {
      items: tiposPorta.data,
      hasNext: numeroTipoPorta < countTiposPorta.data.count
    }

    return tiposPortaResponse
  }
}

export { ListTipoPortaUseCase }
