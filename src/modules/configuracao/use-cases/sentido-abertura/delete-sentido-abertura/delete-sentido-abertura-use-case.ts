import { inject, injectable } from 'tsyringe'
import { SentidoAbertura } from '@modules/configuracao/infra/typeorm/entities/sentido-abertura'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const sentidoAbertura = await this.sentidoAberturaRepository.delete(id)

    return sentidoAbertura
  }
}

export { DeleteSentidoAberturaUseCase }
