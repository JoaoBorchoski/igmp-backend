import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  userId: string
  navigationDate: Date
  route: string
}

@injectable()
class UpdateNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({
    id,
    userId,
    navigationDate,
    route
  }: IRequest): Promise<HttpResponse> {
    const navigation = await this.navigationRepository.update({
      id,
      userId,
      navigationDate,
      route
    })

    return navigation
  }
}

export { UpdateNavigationUseCase }
