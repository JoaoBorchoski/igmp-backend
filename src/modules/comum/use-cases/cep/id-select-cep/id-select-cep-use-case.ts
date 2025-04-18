import { inject, injectable } from "tsyringe"
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const cep = await this.cepRepository.idSelect(id)

    return cep
  }
}

export { IdSelectCepUseCase }
