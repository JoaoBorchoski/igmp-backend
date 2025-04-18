import { inject, injectable } from 'tsyringe'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { INegociacaoDTO } from '@modules/operacao/dtos/i-negociacao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: INegociacaoDTO[],
  hasNext: boolean
}

@injectable()
class ListNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const negociacoes = await this.negociacaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countNegociacoes = await this.negociacaoRepository.count(
      search,
      filter
    )

    const numeroNegociacao = page * rowsPerPage

    const negociacoesResponse = {
      items: negociacoes.data,
      hasNext: numeroNegociacao < countNegociacoes.data.count
    }

    return negociacoesResponse
  }
}

export { ListNegociacaoUseCase }
