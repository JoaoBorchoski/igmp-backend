import { inject, injectable } from 'tsyringe'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'
import { IUserDTO } from '@modules/security/dtos/i-user-dto'

interface IRequest {
  user: IUserDTO
}

@injectable()
class GetUserMenuUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({ user }: IRequest): Promise<HttpResponse> {
    const userMenu = await this.userSecurityRepository.getUserMenu(user)

    return userMenu
  }
}

export { GetUserMenuUseCase }
