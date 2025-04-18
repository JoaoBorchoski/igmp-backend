import { inject, injectable } from 'tsyringe'
import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  disabled: boolean
}

@injectable()
class UpdateUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({
    id,
    name,
    disabled
  }: IRequest): Promise<HttpResponse> {
    const userGroup = await this.userGroupRepository.update({
      id,
      name,
      disabled
    })

    return userGroup
  }
}

export { UpdateUserGroupUseCase }
