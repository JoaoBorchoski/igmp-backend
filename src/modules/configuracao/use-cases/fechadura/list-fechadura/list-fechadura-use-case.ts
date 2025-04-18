import { inject, injectable } from 'tsyringe'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { IFechaduraDTO } from '@modules/configuracao/dtos/i-fechadura-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IFechaduraDTO[],
  hasNext: boolean
}

@injectable()
class ListFechaduraUseCase {
  constructor(@inject('FechaduraRepository')
    private fechaduraRepository: IFechaduraRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const fechaduras = await this.fechaduraRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countFechaduras = await this.fechaduraRepository.count(
      search,
      filter
    )

    const numeroFechadura = page * rowsPerPage

    const fechadurasResponse = {
      items: fechaduras.data,
      hasNext: numeroFechadura < countFechaduras.data.count
    }

    return fechadurasResponse
  }
}

export { ListFechaduraUseCase }
