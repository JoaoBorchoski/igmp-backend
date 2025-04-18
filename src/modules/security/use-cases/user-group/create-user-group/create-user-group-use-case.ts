import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  disabled: boolean
}

@injectable()
class CreateUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({
    name,
    disabled
  }: IRequest): Promise<UserGroup> {
    const result = await this.userGroupRepository.create({
        name,
        disabled
      })
      .then(userGroupResult => {
        return userGroupResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUserGroupUseCase }
