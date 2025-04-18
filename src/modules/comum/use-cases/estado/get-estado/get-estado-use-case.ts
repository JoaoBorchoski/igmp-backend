import { inject, injectable } from 'tsyringe'
import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const estado = await this.estadoRepository.get(id)

    return estado
  }
}

export { GetEstadoUseCase }
