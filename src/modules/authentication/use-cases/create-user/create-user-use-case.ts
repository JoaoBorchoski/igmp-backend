import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { IUserDTO } from '@modules/authentication/dtos/i-user-dto'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { AppError } from '@shared/errors/app-error'

@injectable()
class CreateUserUseCase {
  constructor(@inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    login,
    password
  }: IUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(login)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      name,
      login,
      password: passwordHash
    })
  }
}

export { CreateUserUseCase }
