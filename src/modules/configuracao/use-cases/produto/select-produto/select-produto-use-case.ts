import { inject, injectable } from "tsyringe"
import { ITipoPortaRepository } from "@modules/configuracao/repositories/i-tipo-porta-repository"
import { IProdutoRepository } from "@modules/configuracao/repositories/i-produto-repository"

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const tiposPorta = await this.produtoRepository.select(filter)

    const newTiposPorta = {
      items: tiposPorta.data,
      hasNext: false,
    }

    return newTiposPorta
  }
}

export { SelectProdutoUseCase }
