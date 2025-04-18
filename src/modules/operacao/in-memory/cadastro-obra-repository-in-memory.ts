import { ICadastroObraDTO } from '@modules/operacao/dtos/i-cadastro-obra-dto'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { CadastroObra } from '@modules/operacao/infra/typeorm/entities/cadastro-obra'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CadastroObraRepositoryInMemory implements ICadastroObraRepository {
  cadastroObras: CadastroObra[] = []

  // create
  async create ({
    nome,
    cnpj,
    endereco,
    responsavelObra,
    contato,
    previsaoEntrega,
    tipoObra,
    plantasIguais,
    qtdCasas,
    grupoCasas,
    estruturaPredio,
    qtdAptoPorAndar,
    andares,
    qtdAptos,
    grupoAndares,
    padraoCorId,
    solidaMadeirada,
    coresTiposId
  }: ICadastroObraDTO): Promise<HttpResponse> {
    const cadastroObra = new CadastroObra()

    Object.assign(cadastroObra, {
      nome,
      cnpj,
      endereco,
      responsavelObra,
      contato,
      previsaoEntrega,
      tipoObra,
      plantasIguais,
      qtdCasas,
      grupoCasas,
      estruturaPredio,
      qtdAptoPorAndar,
      andares,
      qtdAptos,
      grupoAndares,
      padraoCorId,
      solidaMadeirada,
      coresTiposId
    })

    this.cadastroObras.push(cadastroObra)

    return ok(cadastroObra)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCadastroObras = this.cadastroObras

    filteredCadastroObras = filteredCadastroObras.filter((cadastroObra) => {
      if (cadastroObra.nome.includes(search)) return true
      if (cadastroObra.cnpj.includes(search)) return true
      if (cadastroObra.endereco.includes(search)) return true
      if (cadastroObra.responsavelObra.includes(search)) return true
      if (cadastroObra.contato.includes(search)) return true
      if (cadastroObra.tipoObra.includes(search)) return true

      return false
    })

    return ok(filteredCadastroObras.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCadastroObras = this.cadastroObras

    filteredCadastroObras = filteredCadastroObras.filter((cadastroObra) => {
      if (cadastroObra.nome.includes(filter)) return true
      if (cadastroObra.cnpj.includes(filter)) return true
      if (cadastroObra.endereco.includes(filter)) return true
      if (cadastroObra.responsavelObra.includes(filter)) return true
      if (cadastroObra.contato.includes(filter)) return true
      if (cadastroObra.tipoObra.includes(filter)) return true

      return false
    })

    return ok(filteredCadastroObras)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredCadastroObras = this.cadastroObras

    filteredCadastroObras = filteredCadastroObras.filter((cadastroObra) => {
      if (cadastroObra.nome.includes(search)) return true
      if (cadastroObra.cnpj.includes(search)) return true
      if (cadastroObra.endereco.includes(search)) return true
      if (cadastroObra.responsavelObra.includes(search)) return true
      if (cadastroObra.contato.includes(search)) return true
      if (cadastroObra.tipoObra.includes(search)) return true

      return false
    })

    return ok(filteredCadastroObras.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const cadastroObra = this.cadastroObras.find((cadastroObra) => cadastroObra.id === id)

    if (typeof cadastroObra === 'undefined') {
      return notFound()
    } else {
      return ok(cadastroObra)
    }
  }


  // update
  async update ({
    id,
    nome,
    cnpj,
    endereco,
    responsavelObra,
    contato,
    previsaoEntrega,
    tipoObra,
    plantasIguais,
    qtdCasas,
    grupoCasas,
    estruturaPredio,
    qtdAptoPorAndar,
    andares,
    qtdAptos,
    grupoAndares,
    padraoCorId,
    solidaMadeirada,
    coresTiposId
  }: ICadastroObraDTO): Promise<HttpResponse> {
    const index = this.cadastroObras.findIndex((cadastroObra) => cadastroObra.id === id)

    this.cadastroObras[index].nome = nome
    this.cadastroObras[index].cnpj = cnpj
    this.cadastroObras[index].endereco = endereco
    this.cadastroObras[index].responsavelObra = responsavelObra
    this.cadastroObras[index].contato = contato
    this.cadastroObras[index].previsaoEntrega = previsaoEntrega
    this.cadastroObras[index].tipoObra = tipoObra
    this.cadastroObras[index].plantasIguais = plantasIguais
    this.cadastroObras[index].qtdCasas = qtdCasas
    this.cadastroObras[index].grupoCasas = grupoCasas
    this.cadastroObras[index].estruturaPredio = estruturaPredio
    this.cadastroObras[index].qtdAptoPorAndar = qtdAptoPorAndar
    this.cadastroObras[index].andares = andares
    this.cadastroObras[index].qtdAptos = qtdAptos
    this.cadastroObras[index].grupoAndares = grupoAndares
    this.cadastroObras[index].padraoCorId = padraoCorId
    this.cadastroObras[index].solidaMadeirada = solidaMadeirada
    this.cadastroObras[index].coresTiposId = coresTiposId

    return ok(this.cadastroObras[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.cadastroObras.findIndex((cadastroObra) => cadastroObra.id === id)

    this.cadastroObras.splice(index, 1)

    return ok(this.cadastroObras)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CadastroObraRepositoryInMemory }
