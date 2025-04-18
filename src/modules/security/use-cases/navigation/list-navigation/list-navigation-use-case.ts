import { inject, injectable } from 'tsyringe'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { INavigationDTO } from '@modules/security/dtos/i-navigation-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: INavigationDTO[],
  hasNext: boolean
}

@injectable()
class ListNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const navigations = await this.navigationRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countNavigations = await this.navigationRepository.count(
      search,
      filter
    )

    const numeroNavigation = page * rowsPerPage

    const navigationsResponse = {
      items: navigations.data,
      hasNext: numeroNavigation < countNavigations.data.count
    }

    return navigationsResponse
  }
}

export { ListNavigationUseCase }
