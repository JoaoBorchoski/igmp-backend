import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse } from "@shared/helpers"

interface IRequest {
  search: string
  filter?: string
}

@injectable()
class CountProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: ITipoPortaRepository
  ) {}

  async execute({ search, filter }: IRequest): Promise<HttpResponse> {
    const tiposPortaCount = await this.produtoRepository.count(search, filter)

    return tiposPortaCount
  }
}

export { CountProdutoUseCase }
