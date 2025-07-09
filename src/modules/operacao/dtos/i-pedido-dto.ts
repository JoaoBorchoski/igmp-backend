interface IPedidoDTO {
    id?: string
    sequencial?: number
    descricao?: string
    cliente?: string
    telefone?: string
    cep?: string
    endereco?: string
    numero?: string
    complemento?: string
    bairro?: string
    estadoId?: string
    cidadeId?: string
    status?: string
    dataEmissao?: Date
    createdAt?: Date
    updatedAt?: Date
    disabled?: boolean
}

export { IPedidoDTO }
