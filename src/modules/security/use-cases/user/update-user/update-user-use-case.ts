import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  userGroupId: string
  name: string
  login: string
  password: string
  isAdmin: boolean
  isSuperUser: boolean
  isBlocked: boolean
  blockReasonId: string
  mustChangePasswordNextLogon: boolean
  mustActiveTwoFactorAuthentication: boolean
  avatar: string
  isDisabled: boolean
}

@injectable()
class UpdateUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) {}

  async execute({
    id,
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    mustActiveTwoFactorAuthentication,
    avatar,
    isDisabled
  }: IRequest): Promise<HttpResponse> {
    const passwordBtoa = btoa(password)
    const passwordHash = await hash(passwordBtoa, 8)

    const user = await this.userSecurityRepository.update({
      id,
      userGroupId,
      name,
      login,
      password: passwordHash,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      mustActiveTwoFactorAuthentication,
      avatar,
      isDisabled
    })

    return user
  }
}

export { UpdateUserUseCase }
