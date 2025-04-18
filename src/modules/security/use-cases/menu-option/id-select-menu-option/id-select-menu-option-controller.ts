import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectMenuOptionUseCase } from './id-select-menu-option-use-case'

class IdSelectMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectMenuOptionUseCase = container.resolve(IdSelectMenuOptionUseCase)

    const menuOption = await idSelectMenuOptionUseCase.execute({
      id: id as string
    })

    return response.json(menuOption.data)
  }
}

export { IdSelectMenuOptionController }
