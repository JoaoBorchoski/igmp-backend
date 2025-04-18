import { inject, injectable } from 'tsyringe'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { IStatusNegociacaoDTO } from '@modules/configuracao/dtos/i-status-negociacao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IStatusNegociacaoDTO[],
  hasNext: boolean
}

@injectable()
class ListStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const statusNegociacoes = await this.statusNegociacaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countStatusNegociacoes = await this.statusNegociacaoRepository.count(
      search,
      filter
    )

    const numeroStatusNegociacao = page * rowsPerPage

    const statusNegociacoesResponse = {
      items: statusNegociacoes.data,
      hasNext: numeroStatusNegociacao < countStatusNegociacoes.data.count
    }

    return statusNegociacoesResponse
  }
}

export { ListStatusNegociacaoUseCase }
