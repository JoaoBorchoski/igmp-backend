import { inject, injectable } from 'tsyringe'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { IPacoteDTO } from '@modules/operacao/dtos/i-pacote-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPacoteDTO[],
  hasNext: boolean
}

@injectable()
class ListPacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const pacotes = await this.pacoteRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPacotes = await this.pacoteRepository.count(
      search,
      filter
    )

    const numeroPacote = page * rowsPerPage

    const pacotesResponse = {
      items: pacotes.data,
      hasNext: numeroPacote < countPacotes.data.count
    }

    return pacotesResponse
  }
}

export { ListPacoteUseCase }
