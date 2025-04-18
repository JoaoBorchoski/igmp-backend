import { inject, injectable } from 'tsyringe'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const userProfile = await this.userProfileRepository.multiDelete(ids)

    return userProfile
  }
}

export { MultiDeleteUserProfileUseCase }
