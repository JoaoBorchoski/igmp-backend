import { inject, injectable } from 'tsyringe'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { IPacoteItemDTO } from '@modules/operacao/dtos/i-pacote-item-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPacoteItemDTO[],
  hasNext: boolean
}

@injectable()
class ListPacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pacotesItems = await this.pacoteItemRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPacotesItems = await this.pacoteItemRepository.count(
      search,
      filter
    )

    const numeroPacoteItem = page * rowsPerPage

    const pacotesItemsResponse = {
      items: pacotesItems.data,
      hasNext: numeroPacoteItem < countPacotesItems.data.count
    }

    return pacotesItemsResponse
  }
}

export { ListPacoteItemUseCase }
