import { inject, injectable } from 'tsyringe'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPadraoCorUseCase {
  constructor(@inject('PadraoCorRepository')
    private padraoCorRepository: IPadraoCorRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const padroesCores = await this.padraoCorRepository.select(filter)

    const newPadroesCores = {
      items: padroesCores.data,
      hasNext: false
    }

    return newPadroesCores
  }
}

export { SelectPadraoCorUseCase }
