import { inject, injectable } from 'tsyringe'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { IMenuOptionDTO } from '@modules/security/dtos/i-menu-option-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IMenuOptionDTO[],
  hasNext: boolean
}

@injectable()
class ListMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const menuOptions = await this.menuOptionRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countMenuOptions = await this.menuOptionRepository.count(
      search,
      filter
    )

    const numeroMenuOption = page * rowsPerPage

    const menuOptionsResponse = {
      items: menuOptions.data,
      hasNext: numeroMenuOption < countMenuOptions.data.count
    }

    return menuOptionsResponse
  }
}

export { ListMenuOptionUseCase }
