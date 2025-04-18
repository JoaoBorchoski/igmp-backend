import { inject, injectable } from 'tsyringe'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const alturaVaos = await this.alturaVaosRepository.multiDelete(ids)

    return alturaVaos
  }
}

export { MultiDeleteAlturaVaosUseCase }
