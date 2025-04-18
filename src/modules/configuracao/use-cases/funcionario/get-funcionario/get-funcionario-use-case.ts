import { inject, injectable } from 'tsyringe'
import { Funcionario } from '@modules/configuracao/infra/typeorm/entities/funcionario'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const funcionario = await this.funcionarioRepository.get(id)

    return funcionario
  }
}

export { GetFuncionarioUseCase }
