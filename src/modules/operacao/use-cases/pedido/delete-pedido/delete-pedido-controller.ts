import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePedidoUseCase } from './delete-pedido-use-case'
import { ListPedidoUseCase } from '../list-pedido/list-pedido-use-case'

class DeletePedidoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePedidoUseCase = container.resolve(DeletePedidoUseCase)
    await deletePedidoUseCase.execute(id)


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

export { DeletePedidoController }
