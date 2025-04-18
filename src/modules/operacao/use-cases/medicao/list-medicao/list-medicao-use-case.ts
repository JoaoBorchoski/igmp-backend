import { inject, injectable } from 'tsyringe'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { IMedicaoDTO } from '@modules/operacao/dtos/i-medicao-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IMedicaoDTO[],
  hasNext: boolean
}

@injectable()
class ListMedicaoUseCase {
  constructor(@inject('MedicaoRepository')
    private medicaoRepository: IMedicaoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const medicoes = await this.medicaoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countMedicoes = await this.medicaoRepository.count(
      search,
      filter
    )

    const numeroMedicao = page * rowsPerPage

    const medicoesResponse = {
      items: medicoes.data,
      hasNext: numeroMedicao < countMedicoes.data.count
    }

    return medicoesResponse
  }
}

export { ListMedicaoUseCase }
