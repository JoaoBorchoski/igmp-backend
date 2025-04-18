import { inject, injectable } from 'tsyringe'
import { CadastroObra } from '@modules/operacao/infra/typeorm/entities/cadastro-obra'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const cadastroObra = await this.cadastroObraRepository.get(id)

    return cadastroObra
  }
}

export { GetCadastroObraUseCase }
