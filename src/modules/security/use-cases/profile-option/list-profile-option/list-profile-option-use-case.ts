import { inject, injectable } from 'tsyringe'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { IProfileOptionDTO } from '@modules/security/dtos/i-profile-option-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IProfileOptionDTO[],
  hasNext: boolean
}

@injectable()
class ListProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const profileOptions = await this.profileOptionRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countProfileOptions = await this.profileOptionRepository.count(
      search,
      filter
    )

    const numeroProfileOption = page * rowsPerPage

    const profileOptionsResponse = {
      items: profileOptions.data,
      hasNext: numeroProfileOption < countProfileOptions.data.count
    }

    return profileOptionsResponse
  }
}

export { ListProfileOptionUseCase }
