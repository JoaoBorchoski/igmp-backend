import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { IProfileDTO } from '@modules/security/dtos/i-profile-dto'

@injectable()
class CreateProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({
    userGroupId,
    name,
    disabled,
    menuOptions
  }: IProfileDTO): Promise<Profile> {
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


    const result = await this.profileRepository.create({
        userGroupId,
        name,
        disabled,
        menuOptions: newMenuOptions
      })
      .then(profileResult => {
        return profileResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateProfileUseCase }
