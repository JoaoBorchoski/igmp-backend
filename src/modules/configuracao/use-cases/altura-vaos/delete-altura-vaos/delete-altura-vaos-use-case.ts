import { inject, injectable } from 'tsyringe'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const alturaVaos = await this.alturaVaosRepository.delete(id)

    return alturaVaos
  }
}

export { DeleteAlturaVaosUseCase }
