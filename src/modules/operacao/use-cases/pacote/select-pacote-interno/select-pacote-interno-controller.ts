import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPacoteInternoUseCase } from './select-pacote-interno-use-case'

class SelectPacoteInternoController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { filter } = request.query

		const selectPacoteInternoUseCase = container.resolve(SelectPacoteInternoUseCase)

		const pacotes = await selectPacoteInternoUseCase.execute({
			filter: filter as string,
		})

		return response.json(pacotes)
	}
}

export { SelectPacoteInternoController }
