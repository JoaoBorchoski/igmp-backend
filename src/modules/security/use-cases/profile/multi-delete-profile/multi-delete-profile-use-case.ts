import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const profile = await this.profileRepository.multiDelete(ids)

    return profile
  }
}

export { MultiDeleteProfileUseCase }
