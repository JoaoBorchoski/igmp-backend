import { inject, injectable } from 'tsyringe'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const module = await this.moduleRepository.multiDelete(ids)

    return module
  }
}

export { MultiDeleteModuleUseCase }
