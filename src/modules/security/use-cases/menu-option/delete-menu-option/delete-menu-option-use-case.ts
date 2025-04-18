import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const menuOption = await this.menuOptionRepository.delete(id)

    return menuOption
  }
}

export { DeleteMenuOptionUseCase }
