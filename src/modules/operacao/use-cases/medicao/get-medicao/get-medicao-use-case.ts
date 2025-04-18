import { inject, injectable } from 'tsyringe'
import { Medicao } from '@modules/operacao/infra/typeorm/entities/medicao'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const medicao = await this.medicaoRepository.get(id)

    return medicao
  }
}

export { GetMedicaoUseCase }
