import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { ITipoPortaDTO } from "@modules/configuracao/dtos/i-tipo-porta-dto"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

interface IRequest {
  search: string
  page: number
  rowsPerPage: number
  order: string
  filter?: string
}

interface ResponseProps {
  items: ITipoPortaDTO[]
  hasNext: boolean
}

@injectable()
class ListProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute({ search = "", page = 0, rowsPerPage = 50, order = "", filter }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tiposPorta = await this.produtoRepository.list(search, newPage, rowsPerPage, order, filter)

    const countTiposPorta = await this.produtoRepository.count(search, filter)

    const numeroTipoPorta = page * rowsPerPage

    const tiposPortaResponse = {
      items: tiposPorta.data,
      hasNext: numeroTipoPorta < countTiposPorta.data.count,
    }

    return tiposPortaResponse
  }
}

export { ListProdutoUseCase }
