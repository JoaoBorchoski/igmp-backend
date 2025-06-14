import { IPedidoItemDTO } from "@modules/operacao/dtos/i-pedido-item-dto"
import { HttpResponse } from "@shared/helpers"
import { EntityManager } from "typeorm"

interface IPedidoItemRepository {
    // create
    create(data: IPedidoItemDTO): Promise<HttpResponse>

    createWithQueryRunner(
        { pedidoId, produto, quantidade, corEtiqueta }: IPedidoItemDTO,
        transactionManager: EntityManager
    ): Promise<HttpResponse>

    // list
    list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse>

    // select
    select(filter: string): Promise<HttpResponse>

    // id select
    idSelect(id: string): Promise<HttpResponse>

    // count
    count(search: string, filter: string): Promise<HttpResponse>

    // get
    get(id: string): Promise<HttpResponse>

    // update
    update(data: IPedidoItemDTO): Promise<HttpResponse>

    // delete
    delete(id: string): Promise<HttpResponse>

    // multi delete
    multiDelete(ids: string[]): Promise<HttpResponse>
}

export { IPedidoItemRepository }
