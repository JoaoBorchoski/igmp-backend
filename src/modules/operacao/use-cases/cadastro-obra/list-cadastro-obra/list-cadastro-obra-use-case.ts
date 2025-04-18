import { inject, injectable } from 'tsyringe'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { ICadastroObraDTO } from '@modules/operacao/dtos/i-cadastro-obra-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICadastroObraDTO[],
  hasNext: boolean
}

@injectable()
class ListCadastroObraUseCase {
  constructor(@inject('CadastroObraRepository')
    private cadastroObraRepository: ICadastroObraRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const cadastroObras = await this.cadastroObraRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCadastroObras = await this.cadastroObraRepository.count(
      search,
      filter
    )

    const numeroCadastroObra = page * rowsPerPage

    const cadastroObrasResponse = {
      items: cadastroObras.data,
      hasNext: numeroCadastroObra < countCadastroObras.data.count
    }

    return cadastroObrasResponse
  }
}

export { ListCadastroObraUseCase }
