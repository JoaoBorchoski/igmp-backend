import { inject, injectable } from "tsyringe"
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const pais = await this.paisRepository.idSelect(id)

    return pais
  }
}

export { IdSelectPaisUseCase }
