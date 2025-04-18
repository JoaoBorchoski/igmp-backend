import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const userProfile = await this.userProfileRepository.get(id)

    const newUserProfile = {
      statusCode: userProfile.statusCode,
      data: {
        id: userProfile.data.id,
        userId: userProfile.data.userId.id,
        profileId: userProfile.data.profileId.id,
      }
    }

    return newUserProfile
  }
}

export { GetUserProfileUseCase }
