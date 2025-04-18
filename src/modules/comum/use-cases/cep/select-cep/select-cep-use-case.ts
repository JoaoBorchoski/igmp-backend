import { inject, injectable } from 'tsyringe'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const ceps = await this.cepRepository.select(filter)

    const newCeps = {
      items: ceps.data,
      hasNext: false
    }

    return newCeps
  }
}

export { SelectCepUseCase }
