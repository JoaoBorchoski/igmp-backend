import { inject, injectable } from "tsyringe"
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const profile = await this.profileRepository.idSelect(id)

    return profile
  }
}

export { IdSelectProfileUseCase }
