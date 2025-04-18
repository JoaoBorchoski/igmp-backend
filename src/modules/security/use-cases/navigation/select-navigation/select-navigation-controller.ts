import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectNavigationUseCase } from './select-navigation-use-case'

class SelectNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectNavigationUseCase = container.resolve(SelectNavigationUseCase)

    const navigations = await selectNavigationUseCase.execute({
      filter: filter as string,
    })

    return response.json(navigations)
  }
}

export { SelectNavigationController }
