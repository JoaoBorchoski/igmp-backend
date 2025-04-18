import { inject, injectable } from 'tsyringe'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const menuOptions = await this.menuOptionRepository.select(filter)

    const newMenuOptions = {
      items: menuOptions.data,
      hasNext: false
    }

    return newMenuOptions
  }
}

export { SelectMenuOptionUseCase }
