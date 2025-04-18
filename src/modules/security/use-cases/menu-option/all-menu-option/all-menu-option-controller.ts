import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AllMenuOptionUseCase } from './all-menu-option-use-case'
import { HttpResponse } from '@shared/helpers'

class AllMenuOptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const allMenuOptionUseCase = container.resolve(AllMenuOptionUseCase)

    const menuOptions = await allMenuOptionUseCase.execute()

    return response.json(menuOptions)
  }
}

export { AllMenuOptionController }
