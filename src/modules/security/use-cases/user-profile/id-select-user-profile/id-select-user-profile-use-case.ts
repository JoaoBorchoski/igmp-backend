import { inject, injectable } from "tsyringe"
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const userProfile = await this.userProfileRepository.idSelect(id)

    return userProfile
  }
}

export { IdSelectUserProfileUseCase }
