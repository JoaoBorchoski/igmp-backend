import { inject, injectable } from "tsyringe"
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const estado = await this.estadoRepository.idSelect(id)

    return estado
  }
}

export { IdSelectEstadoUseCase }
