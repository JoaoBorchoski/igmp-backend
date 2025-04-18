import { inject, injectable } from "tsyringe"
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const funcionario = await this.funcionarioRepository.idSelect(id)

    return funcionario
  }
}

export { IdSelectFuncionarioUseCase }
