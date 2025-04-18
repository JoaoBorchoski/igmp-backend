import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({
    filter,
    estadoId
  }): Promise<ResponseProps> {
    const cidades = await this.cidadeRepository.select(filter, estadoId)

    const newCidades = {
      items: cidades.data,
      hasNext: false
    }

    return newCidades
  }
}

export { SelectCidadeUseCase }
