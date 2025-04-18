import { inject, injectable } from 'tsyringe'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const fechaduras = await this.fechaduraRepository.select(filter)

    const newFechaduras = {
      items: fechaduras.data,
      hasNext: false
    }

    return newFechaduras
  }
}

export { SelectFechaduraUseCase }
