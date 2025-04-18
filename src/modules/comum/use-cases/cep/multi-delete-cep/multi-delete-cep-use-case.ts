import { inject, injectable } from 'tsyringe'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const cep = await this.cepRepository.multiDelete(ids)

    return cep
  }
}

export { MultiDeleteCepUseCase }
