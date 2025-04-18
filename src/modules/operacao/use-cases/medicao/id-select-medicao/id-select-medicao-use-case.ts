import { inject, injectable } from "tsyringe"
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const medicao = await this.medicaoRepository.idSelect(id)

    return medicao
  }
}

export { IdSelectMedicaoUseCase }
