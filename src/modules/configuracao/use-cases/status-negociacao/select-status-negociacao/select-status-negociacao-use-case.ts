import { inject, injectable } from 'tsyringe'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectStatusNegociacaoUseCase {
  constructor(@inject('StatusNegociacaoRepository')
    private statusNegociacaoRepository: IStatusNegociacaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const statusNegociacoes = await this.statusNegociacaoRepository.select(filter)

    const newStatusNegociacoes = {
      items: statusNegociacoes.data,
      hasNext: false
    }

    return newStatusNegociacoes
  }
}

export { SelectStatusNegociacaoUseCase }
