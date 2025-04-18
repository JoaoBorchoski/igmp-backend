import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectMenuOptionUseCase } from './select-menu-option-use-case'

class SelectMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectMenuOptionUseCase = container.resolve(SelectMenuOptionUseCase)

    const menuOptions = await selectMenuOptionUseCase.execute({
      filter: filter as string,
    })

    return response.json(menuOptions)
  }
}

export { SelectMenuOptionController }
