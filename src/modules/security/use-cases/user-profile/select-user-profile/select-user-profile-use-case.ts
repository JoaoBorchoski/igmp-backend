import { inject, injectable } from 'tsyringe'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const usersProfiles = await this.userProfileRepository.select(filter)

    const newUsersProfiles = {
      items: usersProfiles.data,
      hasNext: false
    }

    return newUsersProfiles
  }
}

export { SelectUserProfileUseCase }
