import { inject, injectable } from 'tsyringe'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const pacote = await this.pacoteRepository.multiDelete(ids)

    return pacote
  }
}

export { MultiDeletePacoteUseCase }
