interface INegociacaoDTO {
  id?: string
  medicaoId?: string
  clienteId?: string
  statusNegociacaoId?: string
  funcionarioId?: string
  dataCriacao?: Date
  dataFechamento?: Date
  valorEstimado?: number
  descricao?: string
  motivoPerda?: string
  createdAt?: Date
  updatedAt?: Date
}

export { INegociacaoDTO }
