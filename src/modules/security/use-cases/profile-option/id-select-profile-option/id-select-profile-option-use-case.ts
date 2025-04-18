import { inject, injectable } from "tsyringe"
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const profileOption = await this.profileOptionRepository.idSelect(id)

    return profileOption
  }
}

export { IdSelectProfileOptionUseCase }
