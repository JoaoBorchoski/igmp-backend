import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectNavigationUseCase } from './id-select-navigation-use-case'

class IdSelectNavigationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectNavigationUseCase = container.resolve(IdSelectNavigationUseCase)

    const navigation = await idSelectNavigationUseCase.execute({
      id: id as string
    })

    return response.json(navigation.data)
  }
}

export { IdSelectNavigationController }
