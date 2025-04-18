import { inject, injectable } from 'tsyringe'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const profileOptions = await this.profileOptionRepository.select(filter)

    const newProfileOptions = {
      items: profileOptions.data,
      hasNext: false
    }

    return newProfileOptions
  }
}

export { SelectProfileOptionUseCase }
