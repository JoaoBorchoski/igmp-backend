import { inject, injectable } from 'tsyringe'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const alizares = await this.alizarRepository.select(filter)

    const newAlizares = {
      items: alizares.data,
      hasNext: false
    }

    return newAlizares
  }
}

export { SelectAlizarUseCase }
