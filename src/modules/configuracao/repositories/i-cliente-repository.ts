import { IClienteDTO } from "@modules/configuracao/dtos/i-cliente-dto"
import { HttpResponse } from "@shared/helpers"
import { EntityManager } from "typeorm"

interface IClienteRepository {
    // create
    create(data: IClienteDTO): Promise<HttpResponse>

    createWithQueryRunner(
        {
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
            desabilitado,
        }: IClienteDTO,
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
    update(data: IClienteDTO): Promise<HttpResponse>

    // delete
    delete(id: string): Promise<HttpResponse>

    // multi delete
    multiDelete(ids: string[]): Promise<HttpResponse>
}

export { IClienteRepository }
