import { inject, injectable } from 'tsyringe'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const sentidoAbertura = await this.sentidoAberturaRepository.multiDelete(ids)

    return sentidoAbertura
  }
}

export { MultiDeleteSentidoAberturaUseCase }
