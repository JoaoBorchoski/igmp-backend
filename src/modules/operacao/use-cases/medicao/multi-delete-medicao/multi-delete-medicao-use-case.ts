import { inject, injectable } from 'tsyringe'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const medicao = await this.medicaoRepository.multiDelete(ids)

    return medicao
  }
}

export { MultiDeleteMedicaoUseCase }
