import { inject, injectable } from 'tsyringe'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const cadastroObra = await this.cadastroObraRepository.multiDelete(ids)

    return cadastroObra
  }
}

export { MultiDeleteCadastroObraUseCase }
