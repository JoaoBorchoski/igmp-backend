import { inject, injectable } from 'tsyringe'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pais = await this.paisRepository.multiDelete(ids)

    return pais
  }
}

export { MultiDeletePaisUseCase }
