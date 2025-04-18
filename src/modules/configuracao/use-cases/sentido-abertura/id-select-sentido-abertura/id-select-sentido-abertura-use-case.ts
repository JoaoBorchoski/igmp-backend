import { inject, injectable } from "tsyringe"
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const sentidoAbertura = await this.sentidoAberturaRepository.idSelect(id)

    return sentidoAbertura
  }
}

export { IdSelectSentidoAberturaUseCase }
