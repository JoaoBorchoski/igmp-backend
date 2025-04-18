import { inject, injectable } from 'tsyringe'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const alizar = await this.alizarRepository.multiDelete(ids)

    return alizar
  }
}

export { MultiDeleteAlizarUseCase }
