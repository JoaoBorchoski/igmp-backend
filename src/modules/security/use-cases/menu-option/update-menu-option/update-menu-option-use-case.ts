import { inject, injectable } from 'tsyringe'
import { MenuOption } from '@modules/security/infra/typeorm/entities/menu-option'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  moduleId: string
  sequence: string
  label: string
  route: string
  icon: string
  key: string
  disabled: boolean
}

@injectable()
class UpdateMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({
    id,
    moduleId,
    sequence,
    label,
    route,
    icon,
    key,
    disabled
  }: IRequest): Promise<HttpResponse> {
    const menuOption = await this.menuOptionRepository.update({
      id,
      moduleId,
      sequence,
      label,
      route,
      icon,
      key,
      disabled
    })

    return menuOption
  }
}

export { UpdateMenuOptionUseCase }
