import { inject, injectable } from "tsyringe"
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const module = await this.moduleRepository.idSelect(id)

    return module
  }
}

export { IdSelectModuleUseCase }
