import { inject, injectable } from 'tsyringe'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { ISentidoAberturaDTO } from '@modules/configuracao/dtos/i-sentido-abertura-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ISentidoAberturaDTO[],
  hasNext: boolean
}

@injectable()
class ListSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const sentidosAbertura = await this.sentidoAberturaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countSentidosAbertura = await this.sentidoAberturaRepository.count(
      search,
      filter
    )

    const numeroSentidoAbertura = page * rowsPerPage

    const sentidosAberturaResponse = {
      items: sentidosAbertura.data,
      hasNext: numeroSentidoAbertura < countSentidosAbertura.data.count
    }

    return sentidosAberturaResponse
  }
}

export { ListSentidoAberturaUseCase }
