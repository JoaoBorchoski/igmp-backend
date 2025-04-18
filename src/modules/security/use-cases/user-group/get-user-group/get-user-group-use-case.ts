import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const userGroup = await this.userGroupRepository.get(id)

    const newUserGroup = {
      statusCode: userGroup.statusCode,
      data: {
        id: userGroup.data.id,
        name: userGroup.data.name,
        disabled: userGroup.data.disabled,
      }
    }

    return newUserGroup
  }
}

export { GetUserGroupUseCase }
