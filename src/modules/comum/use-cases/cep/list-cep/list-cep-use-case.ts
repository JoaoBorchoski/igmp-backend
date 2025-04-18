import { inject, injectable } from 'tsyringe'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { ICepDTO } from '@modules/comum/dtos/i-cep-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICepDTO[],
  hasNext: boolean
}

@injectable()
class ListCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const ceps = await this.cepRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCeps = await this.cepRepository.count(
      search,
      filter
    )

    const numeroCep = page * rowsPerPage

    const cepsResponse = {
      items: ceps.data,
      hasNext: numeroCep < countCeps.data.count
    }

    return cepsResponse
  }
}

export { ListCepUseCase }
