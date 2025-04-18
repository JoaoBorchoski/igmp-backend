import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  disabled: boolean
}

@injectable()
class CreateModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({
    name,
    disabled
  }: IRequest): Promise<Module> {
    const result = await this.moduleRepository.create({
        name,
        disabled
      })
      .then(moduleResult => {
        return moduleResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateModuleUseCase }
