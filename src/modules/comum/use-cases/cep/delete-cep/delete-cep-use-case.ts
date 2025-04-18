import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const cep = await this.cepRepository.delete(id)

    return cep
  }
}

export { DeleteCepUseCase }
