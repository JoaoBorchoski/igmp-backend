import { inject, injectable } from 'tsyringe'
import { PacoteItem } from '@modules/operacao/infra/typeorm/entities/pacote-item'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  pacoteId: string
  produto: string
  quantidade: number
}

@injectable()
class UpdatePacoteItemUseCase {
  constructor(@inject('PacoteItemRepository')
    private pacoteItemRepository: IPacoteItemRepository
  ) {}

  async execute({
    id,
    pacoteId,
    produto,
    quantidade
  }: IRequest): Promise<HttpResponse> {
    const pacoteItem = await this.pacoteItemRepository.update({
      id,
      pacoteId,
      produto,
      quantidade
    })

    return pacoteItem
  }
}

export { UpdatePacoteItemUseCase }
