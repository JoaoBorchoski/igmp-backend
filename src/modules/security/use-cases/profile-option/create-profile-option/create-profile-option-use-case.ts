import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  profileId: string
  menuOptionKey: string
  permitAll: boolean
  permitCreate: boolean
  permitRestore: boolean
  permitUpdate: boolean
  permitDelete: boolean
  disabled: boolean
}

@injectable()
class CreateProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IRequest): Promise<ProfileOption> {
    const result = await this.profileOptionRepository.create({
        profileId,
        menuOptionKey,
        permitAll,
        permitCreate,
        permitRestore,
        permitUpdate,
        permitDelete,
        disabled
      })
      .then(profileOptionResult => {
        return profileOptionResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateProfileOptionUseCase }
