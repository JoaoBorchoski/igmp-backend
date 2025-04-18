import { inject, injectable } from 'tsyringe'
import { AlturaVaos } from '@modules/configuracao/infra/typeorm/entities/altura-vaos'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const alturaVaos = await this.alturaVaosRepository.get(id)

    return alturaVaos
  }
}

export { GetAlturaVaosUseCase }
