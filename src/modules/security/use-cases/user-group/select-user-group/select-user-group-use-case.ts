import { inject, injectable } from 'tsyringe'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const userGroups = await this.userGroupRepository.select(filter)

    const newUserGroups = {
      items: userGroups.data,
      hasNext: false
    }

    return newUserGroups
  }
}

export { SelectUserGroupUseCase }
