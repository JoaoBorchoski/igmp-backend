import { inject, injectable } from 'tsyringe'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { IAlturaVaosDTO } from '@modules/configuracao/dtos/i-altura-vaos-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IAlturaVaosDTO[],
  hasNext: boolean
}

@injectable()
class ListAlturaVaosUseCase {
  constructor(@inject('AlturaVaosRepository')
    private alturaVaosRepository: IAlturaVaosRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const alturasVaos = await this.alturaVaosRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countAlturasVaos = await this.alturaVaosRepository.count(
      search,
      filter
    )

    const numeroAlturaVaos = page * rowsPerPage

    const alturasVaosResponse = {
      items: alturasVaos.data,
      hasNext: numeroAlturaVaos < countAlturasVaos.data.count
    }

    return alturasVaosResponse
  }
}

export { ListAlturaVaosUseCase }
