import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePedidoItemUseCase } from './multi-delete-pedido-item-use-case'
import { ListPedidoItemUseCase } from '../list-pedido-item/list-pedido-item-use-case'

class MultiDeletePedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePedidoItemUseCase = container.resolve(MultiDeletePedidoItemUseCase)
    await multiDeletePedidoItemUseCase.execute(ids)


    // restore list with updated records

    const listPedidoItemUseCase = container.resolve(ListPedidoItemUseCase)
    const pedidosItems = await listPedidoItemUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pedidosItems)
  }
}

export { MultiDeletePedidoItemController }
