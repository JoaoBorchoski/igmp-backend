import { inject, injectable } from "tsyringe"
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const cadastroObra = await this.cadastroObraRepository.idSelect(id)

    return cadastroObra
  }
}

export { IdSelectCadastroObraUseCase }
