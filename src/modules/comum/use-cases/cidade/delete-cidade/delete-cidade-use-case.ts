import { inject, injectable } from 'tsyringe'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteCidadeUseCase {
  constructor(@inject('CidadeRepository')
    private cidadeRepository: ICidadeRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const cidade = await this.cidadeRepository.delete(id)

    return cidade
  }
}

export { DeleteCidadeUseCase }
