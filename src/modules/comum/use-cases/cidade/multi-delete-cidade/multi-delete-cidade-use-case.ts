import { inject, injectable } from 'tsyringe'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.multiDelete(ids)

    return cidade
  }
}

export { MultiDeleteCidadeUseCase }
