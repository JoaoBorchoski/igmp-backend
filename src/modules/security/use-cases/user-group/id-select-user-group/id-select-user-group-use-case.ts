import { inject, injectable } from "tsyringe"
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const userGroup = await this.userGroupRepository.idSelect(id)

    return userGroup
  }
}

export { IdSelectUserGroupUseCase }
