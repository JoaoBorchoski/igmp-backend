import { inject, injectable } from 'tsyringe'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  pacoteId: string
  produto: string
  quantidade: number
}

@injectable()
class CreatePacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({
    pacoteId,
    produto,
    quantidade
  }: IRequest): Promise<PacoteItem> {
    const result = await this.pacoteItemRepository.create({
        pacoteId,
        produto,
        quantidade
      })
      .then(pacoteItemResult => {
        return pacoteItemResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePacoteItemUseCase }
