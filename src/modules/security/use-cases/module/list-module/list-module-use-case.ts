import { inject, injectable } from 'tsyringe'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { IModuleDTO } from '@modules/security/dtos/i-module-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IModuleDTO[],
  hasNext: boolean
}

@injectable()
class ListModuleUseCase {
  constructor(@inject('ModuleRepository')
    private moduleRepository: IModuleRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page - 1

    const modules = await this.moduleRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countModules = await this.moduleRepository.count(
      search,
      filter
    )

    const numeroModule = page * rowsPerPage

    const modulesResponse = {
      items: modules.data,
      hasNext: numeroModule < countModules.data.count
    }

    return modulesResponse
  }
}

export { ListModuleUseCase }
