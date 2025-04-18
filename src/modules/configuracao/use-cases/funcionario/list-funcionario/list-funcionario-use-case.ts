import { inject, injectable } from 'tsyringe'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { IFuncionarioDTO } from '@modules/configuracao/dtos/i-funcionario-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IFuncionarioDTO[],
  hasNext: boolean
}

@injectable()
class ListFuncionarioUseCase {
  constructor(@inject('FuncionarioRepository')
    private funcionarioRepository: IFuncionarioRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const funcionarios = await this.funcionarioRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countFuncionarios = await this.funcionarioRepository.count(
      search,
      filter
    )

    const numeroFuncionario = page * rowsPerPage

    const funcionariosResponse = {
      items: funcionarios.data,
      hasNext: numeroFuncionario < countFuncionarios.data.count
    }

    return funcionariosResponse
  }
}

export { ListFuncionarioUseCase }
