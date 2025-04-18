import { inject, injectable } from 'tsyringe'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteMenuOptionUseCase {
  constructor(@inject('MenuOptionRepository')
    private menuOptionRepository: IMenuOptionRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const menuOption = await this.menuOptionRepository.multiDelete(ids)

    return menuOption
  }
}

export { MultiDeleteMenuOptionUseCase }
