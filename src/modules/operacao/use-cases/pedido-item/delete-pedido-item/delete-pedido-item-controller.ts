import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePedidoItemUseCase } from './delete-pedido-item-use-case'
import { ListPedidoItemUseCase } from '../list-pedido-item/list-pedido-item-use-case'

class DeletePedidoItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePedidoItemUseCase = container.resolve(DeletePedidoItemUseCase)
    await deletePedidoItemUseCase.execute(id)


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

export { DeletePedidoItemController }
