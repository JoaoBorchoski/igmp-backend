import { inject, injectable } from 'tsyringe'
import { CadastroObra } from '@modules/operacao/infra/typeorm/entities/cadastro-obra'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const cadastroObrasCount = await this.cadastroObraRepository.count(
      search,
      filter
    )

    return cadastroObrasCount
  }
}

export { CountCadastroObraUseCase }
