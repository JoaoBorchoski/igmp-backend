import { inject, injectable } from 'tsyringe'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetConfigUseCase {
  constructor(@inject('ConfigRepository')
    private configRepository: IConfigRepository
  ) {}

  async execute(title: string): Promise<HttpResponse> {
    const config = await this.configRepository.get(title)

    const newConfig = {
      statusCode: config.statusCode,
      data: {
        id: config.data.id,
        title: config.data.title,
        description: config.data.description,
      }
    }

    return newConfig
  }
}

export { GetConfigUseCase }
