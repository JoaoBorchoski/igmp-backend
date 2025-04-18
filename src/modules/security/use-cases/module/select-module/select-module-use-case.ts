import { inject, injectable } from 'tsyringe'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({ filter }): Promise<ResponseProps> {
    const modules = await this.moduleRepository.select(filter)

    const newModules = {
      items: modules.data,
      hasNext: false
    }

    return newModules
  }
}

export { SelectModuleUseCase }
