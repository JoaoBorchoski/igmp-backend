import { inject, injectable } from 'tsyringe'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const navigations = await this.navigationRepository.select(filter)

    const newNavigations = {
      items: navigations.data,
      hasNext: false
    }

    return newNavigations
  }
}

export { SelectNavigationUseCase }
