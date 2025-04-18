import { inject, injectable } from 'tsyringe'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const alturasVaos = await this.alturaVaosRepository.select(filter)

    const newAlturasVaos = {
      items: alturasVaos.data,
      hasNext: false
    }

    return newAlturasVaos
  }
}

export { SelectAlturaVaosUseCase }
