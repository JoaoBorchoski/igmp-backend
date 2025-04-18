import { inject, injectable } from 'tsyringe'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTipoPortaUseCase {
  constructor(@inject('TipoPortaRepository')
    private tipoPortaRepository: ITipoPortaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const tiposPorta = await this.tipoPortaRepository.select(filter)

    const newTiposPorta = {
      items: tiposPorta.data,
      hasNext: false
    }

    return newTiposPorta
  }
}

export { SelectTipoPortaUseCase }
