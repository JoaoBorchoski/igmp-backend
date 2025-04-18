import { inject, injectable } from 'tsyringe'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const profile = await this.profileRepository.delete(id)

    return profile
  }
}

export { DeleteProfileUseCase }
