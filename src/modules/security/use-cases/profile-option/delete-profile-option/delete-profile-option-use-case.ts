import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const profileOption = await this.profileOptionRepository.delete(id)

    return profileOption
  }
}

export { DeleteProfileOptionUseCase }
