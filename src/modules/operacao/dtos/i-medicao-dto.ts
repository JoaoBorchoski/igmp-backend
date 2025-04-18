interface IMedicaoDTO {
  id?: string
  cadastroObraId?: string
  complemento?: string
  espessuraParede?: string
  larguraVaosId?: string
  alturaVaosId?: string
  tipoEnchimentoId?: string
  tipoPortaId?: string
  confirmacao?: boolean
  complementoOrigemId?: string
  sentidoAberturaId?: string
  alizarId?: string
  fechaduraId?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IMedicaoDTO }
