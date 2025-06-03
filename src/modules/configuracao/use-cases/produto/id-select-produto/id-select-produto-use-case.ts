import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { HttpResponse } from "@shared/helpers/http"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

@injectable()
class IdSelectProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipoPorta = await this.produtoRepository.idSelect(id)

    return tipoPorta
  }
}

export { IdSelectProdutoUseCase }
