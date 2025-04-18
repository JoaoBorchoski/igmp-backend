import { inject, injectable } from 'tsyringe'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { IPadraoCorDTO } from '@modules/configuracao/dtos/i-padrao-cor-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPadraoCorDTO[],
  hasNext: boolean
}

@injectable()
class ListPadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const padroesCores = await this.padraoCorRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPadroesCores = await this.padraoCorRepository.count(
      search,
      filter
    )

    const numeroPadraoCor = page * rowsPerPage

    const padroesCoresResponse = {
      items: padroesCores.data,
      hasNext: numeroPadraoCor < countPadroesCores.data.count
    }

    return padroesCoresResponse
  }
}

export { ListPadraoCorUseCase }
