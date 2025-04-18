import { inject, injectable } from 'tsyringe'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { IUserGroupDTO } from '@modules/security/dtos/i-user-group-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IUserGroupDTO[],
  hasNext: boolean
}

@injectable()
class ListUserGroupUseCase {
  constructor(@inject('UserGroupRepository')
    private userGroupRepository: IUserGroupRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const userGroups = await this.userGroupRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countUserGroups = await this.userGroupRepository.count(
      search,
      filter
    )

    const numeroUserGroup = page * rowsPerPage

    const userGroupsResponse = {
      items: userGroups.data,
      hasNext: numeroUserGroup < countUserGroups.data.count
    }

    return userGroupsResponse
  }
}

export { ListUserGroupUseCase }
