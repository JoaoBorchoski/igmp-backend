import { inject, injectable } from 'tsyringe'
import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePacoteUseCase {
  constructor(@inject('PacoteRepository')
    private pacoteRepository: IPacoteRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pacote = await this.pacoteRepository.delete(id)

    return pacote
  }
}

export { DeletePacoteUseCase }
