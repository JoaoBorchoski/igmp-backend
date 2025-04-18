import { inject, injectable } from 'tsyringe'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const userGroup = await this.userGroupRepository.multiDelete(ids)

    return userGroup
  }
}

export { MultiDeleteUserGroupUseCase }
