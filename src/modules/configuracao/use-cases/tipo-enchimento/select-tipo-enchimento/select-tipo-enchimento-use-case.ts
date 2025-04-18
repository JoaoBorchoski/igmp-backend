import { inject, injectable } from 'tsyringe'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTipoEnchimentoUseCase {
  constructor(@inject('TipoEnchimentoRepository')
    private tipoEnchimentoRepository: ITipoEnchimentoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const tiposEnchimento = await this.tipoEnchimentoRepository.select(filter)

    const newTiposEnchimento = {
      items: tiposEnchimento.data,
      hasNext: false
    }

    return newTiposEnchimento
  }
}

export { SelectTipoEnchimentoUseCase }
