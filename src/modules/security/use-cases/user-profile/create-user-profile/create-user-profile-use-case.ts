import { inject, injectable } from 'tsyringe'
import { UserProfile } from '@modules/security/infra/typeorm/entities/user-profile'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  userId: string
  profileId: string
}

@injectable()
class CreateUserProfileUseCase {
  constructor(@inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository
  ) {}

  async execute({
    userId,
    profileId
  }: IRequest): Promise<UserProfile> {
    const result = await this.userProfileRepository.create({
        userId,
        profileId
      })
      .then(userProfileResult => {
        return userProfileResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUserProfileUseCase }
