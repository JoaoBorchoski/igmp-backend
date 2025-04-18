import { inject, injectable } from 'tsyringe'
import { Module } from '@modules/security/infra/typeorm/entities/module'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const modulesCount = await this.moduleRepository.count(
      search,
      filter
    )

    return modulesCount
  }
}

export { CountModuleUseCase }
