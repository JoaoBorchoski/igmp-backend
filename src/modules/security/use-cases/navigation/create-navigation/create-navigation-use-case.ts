import { inject, injectable } from 'tsyringe'
import { Navigation } from '@modules/security/infra/typeorm/entities/navigation'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  userId: string
  navigationDate: Date
  route: string
}

@injectable()
class CreateNavigationUseCase {
  constructor(@inject('NavigationRepository')
    private navigationRepository: INavigationRepository
  ) {}

  async execute({
    userId,
    navigationDate,
    route
  }: IRequest): Promise<Navigation> {
    if (!navigationDate) {
      navigationDate = new Date()
    }

    const result = await this.navigationRepository.create({
        userId,
        navigationDate,
        route
      })
      .then(navigationResult => {
        return navigationResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateNavigationUseCase }
