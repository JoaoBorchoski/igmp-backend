import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const usersProfilesCount = await this.userProfileRepository.count(search)

    return usersProfilesCount
  }
}

export { CountUserProfileUseCase }
