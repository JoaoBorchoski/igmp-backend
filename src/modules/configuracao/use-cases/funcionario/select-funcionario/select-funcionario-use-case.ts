import { inject, injectable } from 'tsyringe'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const funcionarios = await this.funcionarioRepository.select(filter)

    const newFuncionarios = {
      items: funcionarios.data,
      hasNext: false
    }

    return newFuncionarios
  }
}

export { SelectFuncionarioUseCase }
