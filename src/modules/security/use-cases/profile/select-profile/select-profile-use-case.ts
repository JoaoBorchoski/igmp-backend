import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const profiles = await this.profileRepository.select(filter)

    const newProfiles = {
      items: profiles.data,
      hasNext: false
    }

    return newProfiles
  }
}

export { SelectProfileUseCase }
