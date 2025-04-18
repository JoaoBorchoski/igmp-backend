import { inject, injectable } from 'tsyringe'
import { Medicao } from '@modules/operacao/infra/typeorm/entities/medicao'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const medicoesCount = await this.medicaoRepository.count(
      search,
      filter
    )

    return medicoesCount
  }
}

export { CountMedicaoUseCase }
