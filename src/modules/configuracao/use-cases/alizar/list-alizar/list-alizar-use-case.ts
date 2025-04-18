import { inject, injectable } from 'tsyringe'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { IAlizarDTO } from '@modules/configuracao/dtos/i-alizar-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IAlizarDTO[],
  hasNext: boolean
}

@injectable()
class ListAlizarUseCase {
  constructor(@inject('AlizarRepository')
    private alizarRepository: IAlizarRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const alizares = await this.alizarRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countAlizares = await this.alizarRepository.count(
      search,
      filter
    )

    const numeroAlizar = page * rowsPerPage

    const alizaresResponse = {
      items: alizares.data,
      hasNext: numeroAlizar < countAlizares.data.count
    }

    return alizaresResponse
  }
}

export { ListAlizarUseCase }
