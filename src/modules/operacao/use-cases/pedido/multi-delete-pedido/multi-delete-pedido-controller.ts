import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePedidoUseCase } from './multi-delete-pedido-use-case'
import { ListPedidoUseCase } from '../list-pedido/list-pedido-use-case'

class MultiDeletePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePedidoUseCase = container.resolve(MultiDeletePedidoUseCase)
    await multiDeletePedidoUseCase.execute(ids)


    // restore list with updated records

    const listPedidoUseCase = container.resolve(ListPedidoUseCase)
    const pedidos = await listPedidoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pedidos)
  }
}

export { MultiDeletePedidoController }
