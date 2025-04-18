import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const userProfile = await this.userProfileRepository.delete(id)

    return userProfile
  }
}

export { DeleteUserProfileUseCase }
