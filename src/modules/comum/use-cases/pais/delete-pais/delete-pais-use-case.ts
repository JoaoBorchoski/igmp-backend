import { inject, injectable } from 'tsyringe'
import { Pais } from '@modules/comum/infra/typeorm/entities/pais'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePaisUseCase {
  constructor(@inject('PaisRepository')
    private paisRepository: IPaisRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pais = await this.paisRepository.delete(id)

    return pais
  }
}

export { DeletePaisUseCase }
