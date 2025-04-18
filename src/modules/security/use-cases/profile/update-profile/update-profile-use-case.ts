import { inject, injectable } from 'tsyringe'
import { IProfileDTO } from '@modules/security/dtos/i-profile-dto';
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class UpdateProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    id,
    userGroupId,
    name,
    disabled,
    menuOptions
  }: IProfileDTO): Promise<HttpResponse> {
    const newMenuOptions = []

    menuOptions.map(menuOption => {
      newMenuOptions.push({
        menuOptionKey: menuOption.menuOptionKey,
        permitAll: false,
        permitCreate: false,
        permitDelete: false,
        permitRestore: false,
        permitUpdate: false,
        disabled: false
      })

      menuOption.data.map(menuItem => newMenuOptions.push(menuItem))
    })

    const profile = await this.profileRepository.update({
      id,
      userGroupId,
      name,
      disabled,
      menuOptions: newMenuOptions
    })

    return profile
  }
}

export { UpdateProfileUseCase }
