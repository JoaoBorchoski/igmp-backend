import { inject, injectable } from "tsyringe"
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const navigation = await this.navigationRepository.idSelect(id)

    return navigation
  }
}

export { IdSelectNavigationUseCase }
