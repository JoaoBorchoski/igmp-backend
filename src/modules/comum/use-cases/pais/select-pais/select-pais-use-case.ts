import { inject, injectable } from 'tsyringe'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const paises = await this.paisRepository.select(filter)

    const newPaises = {
      items: paises.data,
      hasNext: false
    }

    return newPaises
  }
}

export { SelectPaisUseCase }
