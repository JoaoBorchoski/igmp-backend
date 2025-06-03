import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse } from "@shared/helpers"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

@injectable()
class MultiDeleteProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipoPorta = await this.produtoRepository.multiDelete(ids)

    return tipoPorta
  }
}

export { MultiDeleteProdutoUseCase }
