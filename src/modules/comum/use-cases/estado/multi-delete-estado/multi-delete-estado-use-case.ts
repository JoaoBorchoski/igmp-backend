import { inject, injectable } from 'tsyringe'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteEstadoUseCase {
  constructor(@inject('EstadoRepository')
    private estadoRepository: IEstadoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const estado = await this.estadoRepository.multiDelete(ids)

    return estado
  }
}

export { MultiDeleteEstadoUseCase }
