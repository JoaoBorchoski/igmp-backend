import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  userId: string
  profileId: string
}

@injectable()
class UpdateUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({
    id,
    userId,
    profileId
  }: IRequest): Promise<HttpResponse> {
    const userProfile = await this.userProfileRepository.update({
      id,
      userId,
      profileId
    })

    return userProfile
  }
}

export { UpdateUserProfileUseCase }
