import { inject, injectable } from 'tsyringe'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const larguraVaos = await this.larguraVaosRepository.multiDelete(ids)

    return larguraVaos
  }
}

export { MultiDeleteLarguraVaosUseCase }
