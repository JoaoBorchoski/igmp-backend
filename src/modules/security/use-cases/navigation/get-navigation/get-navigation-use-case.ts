import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const navigation = await this.navigationRepository.get(id)

    const newNavigation = {
      statusCode: navigation.statusCode,
      data: {
        id: navigation.data.id,
        userId: navigation.data.userId.id,
        navigationDate: navigation.data.navigationDate,
        route: navigation.data.route,
      }
    }

    return newNavigation
  }
}

export { GetNavigationUseCase }
