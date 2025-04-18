import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({
    id,
    profileId,
    menuOptionKey,
    permitAll,
    permitCreate,
    permitRestore,
    permitUpdate,
    permitDelete,
    disabled
  }: IRequest): Promise<HttpResponse> {
    const profileOption = await this.profileOptionRepository.update({
      id,
      profileId,
      menuOptionKey,
      permitAll,
      permitCreate,
      permitRestore,
      permitUpdate,
      permitDelete,
      disabled
    })

    return profileOption
  }
}

export { UpdateProfileOptionUseCase }
