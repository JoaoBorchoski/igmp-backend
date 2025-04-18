import { inject, injectable } from 'tsyringe'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { ILarguraVaosDTO } from '@modules/configuracao/dtos/i-largura-vaos-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ILarguraVaosDTO[],
  hasNext: boolean
}

@injectable()
class ListLarguraVaosUseCase {
  constructor(@inject('LarguraVaosRepository')
    private larguraVaosRepository: ILarguraVaosRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const largurasVaos = await this.larguraVaosRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countLargurasVaos = await this.larguraVaosRepository.count(
      search,
      filter
    )

    const numeroLarguraVaos = page * rowsPerPage

    const largurasVaosResponse = {
      items: largurasVaos.data,
      hasNext: numeroLarguraVaos < countLargurasVaos.data.count
    }

    return largurasVaosResponse
  }
}

export { ListLarguraVaosUseCase }
