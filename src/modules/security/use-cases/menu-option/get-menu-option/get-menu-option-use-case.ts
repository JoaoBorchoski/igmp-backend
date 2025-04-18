import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const menuOption = await this.menuOptionRepository.get(id)

    const newMenuOption = {
      statusCode: menuOption.statusCode,
      data: {
        id: menuOption.data.id,
        moduleId: menuOption.data.moduleId.id,
        sequence: menuOption.data.sequence,
        label: menuOption.data.label,
        route: menuOption.data.route,
        icon: menuOption.data.icon,
        key: menuOption.data.key,
        disabled: menuOption.data.disabled,
      }
    }

    return newMenuOption
  }
}

export { GetMenuOptionUseCase }
