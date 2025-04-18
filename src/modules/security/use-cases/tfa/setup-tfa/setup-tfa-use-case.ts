import { inject, injectable } from "tsyringe"
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { IUserDTO } from "@modules/security/dtos/i-user-dto"

@injectable()
class SetupTFAUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository
  ) { }

  async execute(user: IUserDTO, tfa: object): Promise<void> {
    await this.userSecurityRepository.updateTFA(user, tfa)

    return
  }
}

export { SetupTFAUseCase }
