import { inject, injectable } from 'tsyringe'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectSentidoAberturaUseCase {
  constructor(@inject('SentidoAberturaRepository')
    private sentidoAberturaRepository: ISentidoAberturaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const sentidosAbertura = await this.sentidoAberturaRepository.select(filter)

    const newSentidosAbertura = {
      items: sentidosAbertura.data,
      hasNext: false
    }

    return newSentidosAbertura
  }
}

export { SelectSentidoAberturaUseCase }
