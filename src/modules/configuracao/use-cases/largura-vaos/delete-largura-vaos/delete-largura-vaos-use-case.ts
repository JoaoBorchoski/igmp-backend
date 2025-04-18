import { inject, injectable } from 'tsyringe'
import { LarguraVaos } from '@modules/configuracao/infra/typeorm/entities/largura-vaos'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const larguraVaos = await this.larguraVaosRepository.delete(id)

    return larguraVaos
  }
}

export { DeleteLarguraVaosUseCase }
