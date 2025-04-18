import { inject, injectable } from 'tsyringe'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const funcionario = await this.funcionarioRepository.multiDelete(ids)

    return funcionario
  }
}

export { MultiDeleteFuncionarioUseCase }
