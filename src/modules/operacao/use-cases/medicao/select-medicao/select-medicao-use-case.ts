import { inject, injectable } from 'tsyringe'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const medicoes = await this.medicaoRepository.select(filter)

    const newMedicoes = {
      items: medicoes.data,
      hasNext: false
    }

    return newMedicoes
  }
}

export { SelectMedicaoUseCase }
