import { inject, injectable } from 'tsyringe'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const profileOption = await this.profileOptionRepository.multiDelete(ids)

    return profileOption
  }
}

export { MultiDeleteProfileOptionUseCase }
