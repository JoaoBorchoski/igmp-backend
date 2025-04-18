import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFuncionarioUseCase } from './update-funcionario-use-case'

class UpdateFuncionarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cpf,
      rg,
      email,
      cep,
      paisId,
      estadoId,
      cidadeId,
      bairro,
      endereco,
      numero,
      complemento,
      telefone,
      observacoes,
      usuarioId,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateFuncionarioUseCase = container.resolve(UpdateFuncionarioUseCase)

    const result = await updateFuncionarioUseCase.execute({
        id,
        nome,
        cpf,
        rg,
        email,
        cep,
        paisId,
        estadoId,
        cidadeId,
        bairro,
        endereco,
        numero,
        complemento,
        telefone,
        observacoes,
        usuarioId,
        desabilitado
      })
      .then(funcionarioResult => {
        return funcionarioResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateFuncionarioController }
