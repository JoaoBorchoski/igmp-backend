import { inject, injectable } from "tsyringe"
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.idSelect(id)

    return cidade
  }
}

export { IdSelectCidadeUseCase }
