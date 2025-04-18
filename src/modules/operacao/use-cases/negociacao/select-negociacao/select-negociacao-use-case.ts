import { inject, injectable } from 'tsyringe'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectNegociacaoUseCase {
  constructor(@inject('NegociacaoRepository')
    private negociacaoRepository: INegociacaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const negociacoes = await this.negociacaoRepository.select(filter)

    const newNegociacoes = {
      items: negociacoes.data,
      hasNext: false
    }

    return newNegociacoes
  }
}

export { SelectNegociacaoUseCase }
