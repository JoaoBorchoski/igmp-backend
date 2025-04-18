import { inject, injectable } from 'tsyringe'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const cadastroObras = await this.cadastroObraRepository.select(filter)

    const newCadastroObras = {
      items: cadastroObras.data,
      hasNext: false
    }

    return newCadastroObras
  }
}

export { SelectCadastroObraUseCase }
