import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/app-error'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  title: string
  description: JSON
}

@injectable()
class UpdateConfigUseCase {
  constructor(@inject('ConfigRepository')
    private configRepository: IConfigRepository
  ) {}

  async execute({
    title,
    description
  }: IRequest): Promise<HttpResponse> {
    const config = await this.configRepository.update({
      title,
      description
    })

    return config
  }
}

export { UpdateConfigUseCase }
