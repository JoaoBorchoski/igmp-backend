import { inject, injectable } from 'tsyringe'
import { ProfileOption } from '@modules/security/infra/typeorm/entities/profile-option'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetProfileOptionUseCase {
  constructor(@inject('ProfileOptionRepository')
    private profileOptionRepository: IProfileOptionRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const profileOption = await this.profileOptionRepository.get(id)

    const newProfileOption = {
      statusCode: profileOption.statusCode,
      data: {
        id: profileOption.data.id,
        profileId: profileOption.data.profileId.id,
        menu_option_key: profileOption.data.menu_option_key,
        permit_all: profileOption.data.permit_all,
        permit_create: profileOption.data.permit_create,
        permit_restore: profileOption.data.permit_restore,
        permit_update: profileOption.data.permit_update,
        permit_delete: profileOption.data.permit_delete,
        disabled: profileOption.data.disabled,
      }
    }

    return newProfileOption
  }
}

export { GetProfileOptionUseCase }
