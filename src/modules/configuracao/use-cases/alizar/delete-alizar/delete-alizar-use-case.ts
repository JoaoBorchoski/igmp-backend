import { inject, injectable } from 'tsyringe'
import { Alizar } from '@modules/configuracao/infra/typeorm/entities/alizar'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const alizar = await this.alizarRepository.delete(id)

    return alizar
  }
}

export { DeleteAlizarUseCase }
