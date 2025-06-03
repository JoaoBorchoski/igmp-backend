import { HttpResponse } from "@shared/helpers"
import { IProdutoDTO } from "../dtos/i-produto"
import { EntityManager } from "typeorm"

interface IProdutoRepository {
    // create
    create(data: IProdutoDTO): Promise<HttpResponse>

    createWithQueryRunner(
        {
            nome,
            descricao,
            tipo,
            sentidoAbertura,
            tipoPorta,
            tipoEnchimento,
            fechadura,
            alturaPorta,
            larguraPorta,
            espessuraPorta,
            larguraBatatente,
            espessuraCanalAlizar,
        }: IProdutoDTO,
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
    update(data: IProdutoDTO): Promise<HttpResponse>

    // delete
    delete(id: string): Promise<HttpResponse>

    // multi delete
    multiDelete(ids: string[]): Promise<HttpResponse>
}

export { IProdutoRepository }
