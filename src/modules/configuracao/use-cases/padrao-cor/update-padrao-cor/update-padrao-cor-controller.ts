import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePadraoCorUseCase } from './update-padrao-cor-use-case'

class UpdatePadraoCorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updatePadraoCorUseCase = container.resolve(UpdatePadraoCorUseCase)

    const result = await updatePadraoCorUseCase.execute({
        id,
        nome,
        descricao
      })
      .then(padraoCorResult => {
        return padraoCorResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePadraoCorController }
