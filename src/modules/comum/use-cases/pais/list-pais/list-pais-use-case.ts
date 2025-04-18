import { inject, injectable } from 'tsyringe'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { IPaisDTO } from '@modules/comum/dtos/i-pais-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPaisDTO[],
  hasNext: boolean
}

@injectable()
class ListPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const paises = await this.paisRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPaises = await this.paisRepository.count(
      search,
      filter
    )

    const numeroPais = page * rowsPerPage

    const paisesResponse = {
      items: paises.data,
      hasNext: numeroPais < countPaises.data.count
    }

    return paisesResponse
  }
}

export { ListPaisUseCase }
