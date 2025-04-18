import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectLarguraVaosUseCase } from './id-select-largura-vaos-use-case'

class IdSelectLarguraVaosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectLarguraVaosUseCase = container.resolve(IdSelectLarguraVaosUseCase)

    const larguraVaos = await idSelectLarguraVaosUseCase.execute({
      id: id as string
    })

    return response.json(larguraVaos.data)
  }
}

export { IdSelectLarguraVaosController }
