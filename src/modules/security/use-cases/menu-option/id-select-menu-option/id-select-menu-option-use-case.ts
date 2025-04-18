import { inject, injectable } from "tsyringe"
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const menuOption = await this.menuOptionRepository.idSelect(id)

    return menuOption
  }
}

export { IdSelectMenuOptionUseCase }
