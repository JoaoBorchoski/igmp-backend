import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const userGroupsCount = await this.userGroupRepository.count(search)

    return userGroupsCount
  }
}

export { CountUserGroupUseCase }
