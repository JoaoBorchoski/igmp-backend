import { IClienteDTO } from '@modules/configuracao/dtos/i-cliente-dto'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { Cliente } from '@modules/configuracao/infra/typeorm/entities/cliente'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class ClienteRepositoryInMemory implements IClienteRepository {
  clientes: Cliente[] = []

  // create
  async create ({
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
  }: IClienteDTO): Promise<HttpResponse> {
    const cliente = new Cliente()

    Object.assign(cliente, {
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

    this.clientes.push(cliente)

    return ok(cliente)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(search)) return true
      if (cliente.cpf.includes(search)) return true
      if (cliente.email.includes(search)) return true

      return false
    })

    return ok(filteredClientes.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(filter)) return true
      if (cliente.cpf.includes(filter)) return true
      if (cliente.email.includes(filter)) return true

      return false
    })

    return ok(filteredClientes)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredClientes = this.clientes

    filteredClientes = filteredClientes.filter((cliente) => {
      if (cliente.nome.includes(search)) return true
      if (cliente.cpf.includes(search)) return true
      if (cliente.email.includes(search)) return true

      return false
    })

    return ok(filteredClientes.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cliente = this.clientes.find((cliente) => cliente.id === id)

    if (typeof cliente === 'undefined') {
      return notFound()
    } else {
      return ok(cliente)
    }
  }


  // update
  async update ({
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
  }: IClienteDTO): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes[index].nome = nome
    this.clientes[index].cpf = cpf
    this.clientes[index].rg = rg
    this.clientes[index].email = email
    this.clientes[index].cep = cep
    this.clientes[index].paisId = paisId
    this.clientes[index].estadoId = estadoId
    this.clientes[index].cidadeId = cidadeId
    this.clientes[index].bairro = bairro
    this.clientes[index].endereco = endereco
    this.clientes[index].numero = numero
    this.clientes[index].complemento = complemento
    this.clientes[index].telefone = telefone
    this.clientes[index].observacoes = observacoes
    this.clientes[index].usuarioId = usuarioId
    this.clientes[index].desabilitado = desabilitado

    return ok(this.clientes[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id)

    this.clientes.splice(index, 1)

    return ok(this.clientes)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { ClienteRepositoryInMemory }
