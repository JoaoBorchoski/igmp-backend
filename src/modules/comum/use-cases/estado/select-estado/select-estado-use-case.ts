import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const estados = await this.estadoRepository.select(filter)

    const newEstados = {
      items: estados.data,
      hasNext: false
    }

    return newEstados
  }
}

export { SelectEstadoUseCase }
