import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  moduleId: string
  sequence: string
  label: string
  route: string
  icon: string
  key: string
  disabled: boolean
}

@injectable()
class CreateMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IRequest): Promise<MenuOption> {
    const result = await this.menuOptionRepository.create({
        moduleId,
        sequence,
        label,
        route,
        icon,
        key,
        disabled
      })
      .then(menuOptionResult => {
        return menuOptionResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateMenuOptionUseCase }
