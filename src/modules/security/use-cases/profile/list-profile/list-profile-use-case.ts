import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { IProfileDTO } from '@modules/security/dtos/i-profile-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IProfileDTO[],
  hasNext: boolean
}

@injectable()
class ListProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const profiles = await this.profileRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countProfiles = await this.profileRepository.count(
      search,
      filter
    )

    const numeroProfile = page * rowsPerPage

    const profilesResponse = {
      items: profiles.data,
      hasNext: numeroProfile < countProfiles.data.count
    }

    return profilesResponse
  }
}

export { ListProfileUseCase }
