import { inject, injectable } from "tsyringe"
import { totp } from "speakeasy"
import { AppError } from "@shared/errors/app-error"
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"

@injectable()
class ValidateTFAUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) { }

  async execute(code: string, login: string) {
    const user = await this.userRepository.findByEmail(login)
    
    const isVerified = totp.verify({
      secret: user.tfa.tempSecret,
      encoding: 'base32',
      token: code
    })

    if (!isVerified) {
      throw new AppError('Invalid Auth Code', 403)
    }

    const newTFA = {
      secret: user.tfa.tempSecret,
      tempSecret: user.tfa.tempSecret,
      dataURL: user.tfa.dataURL,
      tfaURL: user.tfa.tfaURL
    }

    await this.userSecurityRepository.updateTFA(user, newTFA)
    
    return isVerified
  }
}

export { ValidateTFAUseCase }
