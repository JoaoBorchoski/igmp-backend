import { inject, injectable } from 'tsyringe'
import { SentidoAbertura } from '@modules/configuracao/infra/typeorm/entities/sentido-abertura'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const sentidosAberturaCount = await this.sentidoAberturaRepository.count(
      search,
      filter
    )

    return sentidosAberturaCount
  }
}

export { CountSentidoAberturaUseCase }
