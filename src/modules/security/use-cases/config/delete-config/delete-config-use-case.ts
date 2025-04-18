import { inject, injectable } from 'tsyringe'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteConfigUseCase {
  constructor(@inject('ConfigRepository')
    private configRepository: IConfigRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const config = await this.configRepository.delete(id)

    return config
  }
}

export { DeleteConfigUseCase }
