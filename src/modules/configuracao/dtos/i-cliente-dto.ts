interface IClienteDTO {
  id?: string
  nome?: string
  cpf?: string
  rg?: string
  email?: string
  cep?: string
  paisId?: string
  estadoId?: string
  cidadeId?: string
  bairro?: string
  endereco?: string
  numero?: number
  complemento?: string
  telefone?: string
  observacoes?: string
  usuarioId?: string
  desabilitado?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IClienteDTO }
