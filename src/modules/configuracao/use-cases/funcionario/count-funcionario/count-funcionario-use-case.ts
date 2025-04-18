import { inject, injectable } from 'tsyringe'
import { Funcionario } from '@modules/configuracao/infra/typeorm/entities/funcionario'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const funcionariosCount = await this.funcionarioRepository.count(
      search,
      filter
    )

    return funcionariosCount
  }
}

export { CountFuncionarioUseCase }
