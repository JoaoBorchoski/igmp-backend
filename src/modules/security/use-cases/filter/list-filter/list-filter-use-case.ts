import { inject, injectable } from 'tsyringe'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { IFilterDTO } from '@modules/security/dtos/i-filter-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IFilterDTO[],
  hasNext: boolean
}

@injectable()
class ListFilterUseCase {
  constructor(@inject('FilterRepository')
    private filterRepository: IFilterRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const filters = await this.filterRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countFilters = await this.filterRepository.count(search)

    const numeroFilter = page * rowsPerPage

    const filtersResponse = {
      items: filters.data,
      hasNext: numeroFilter < countFilters.data.count
    }

    return filtersResponse
  }
}

export { ListFilterUseCase }
