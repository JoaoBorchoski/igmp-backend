import { inject, injectable } from 'tsyringe'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const navigation = await this.navigationRepository.multiDelete(ids)

    return navigation
  }
}

export { MultiDeleteNavigationUseCase }
