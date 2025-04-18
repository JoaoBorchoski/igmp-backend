import { inject, injectable } from "tsyringe"
import { IUserSecurityRepository } from "@modules/security/repositories/i-user-security-repository"
import { IUserDTO } from "@modules/security/dtos/i-user-dto"

@injectable()
class DisableTFAUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) { }

  async execute(user: IUserDTO) {
    await this.userSecurityRepository.updateTFA(user, null)

    return
  }
}

export { DisableTFAUseCase }
