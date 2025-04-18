import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const profile = await this.profileRepository.get(id)

    const newProfile = {
      statusCode: profile.statusCode,
      data: {
        id: profile.data.id,
        userGroupId: profile.data.userGroupId,
        name: profile.data.name,
        disabled: profile.data.disabled,
        menuOptions: profile.data.menuOptions
      }
    }

    return newProfile
  }
}

export { GetProfileUseCase }
