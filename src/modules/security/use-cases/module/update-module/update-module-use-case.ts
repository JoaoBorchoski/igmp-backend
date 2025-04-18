import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  disabled: boolean
}

@injectable()
class UpdateModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({
    id,
    name,
    disabled
  }: IRequest): Promise<HttpResponse> {
    const module = await this.moduleRepository.update({
      id,
      name,
      disabled
    })

    return module
  }
}

export { UpdateModuleUseCase }
