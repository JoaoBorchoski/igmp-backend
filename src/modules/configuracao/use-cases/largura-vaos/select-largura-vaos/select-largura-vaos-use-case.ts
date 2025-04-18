import { inject, injectable } from 'tsyringe'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const largurasVaos = await this.larguraVaosRepository.select(filter)

    const newLargurasVaos = {
      items: largurasVaos.data,
      hasNext: false
    }

    return newLargurasVaos
  }
}

export { SelectLarguraVaosUseCase }
