import { inject, injectable } from 'tsyringe'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { Config } from '@modules/security/infra/typeorm/entities/config'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  title: string
  description: JSON
}

@injectable()
class CreateConfigUseCase {
  constructor(@inject('ConfigRepository')
    private configRepository: IConfigRepository
  ) {}

  async execute({
    title,
    description
  }: IRequest): Promise<Config> {
    const result = await this.configRepository.create({
        title,
        description
      })
      .then(configResult => {
        return configResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateConfigUseCase }
