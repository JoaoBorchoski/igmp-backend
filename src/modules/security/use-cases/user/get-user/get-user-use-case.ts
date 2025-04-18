import { inject, injectable } from 'tsyringe'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const user = await this.userSecurityRepository.get(id)

    const newUser = {
      statusCode: user.statusCode,
      data: {
        id: user.data.id,
        userGroupId: user.data.userGroupId?.id,
        name: user.data.name,
        login: user.data.login,
        password: user.data.password,
        isAdmin: user.data.isAdmin,
        isSuperUser: user.data.isSuperUser,
        isBlocked: user.data.isBlocked,
        blockReasonId: user.data.blockReasonId?.id,
        mustChangePasswordNextLogon: user.data.mustChangePasswordNextLogon,
        mustActiveTwoFactorAuthentication: user.data.mustActiveTwoFactorAuthentication,
        avatar: user.data.avatar,
        disabled: user.data.isDisabled,
      }
    }

    return newUser
  }
}

export { GetUserUseCase }
