import { String } from "aws-sdk/clients/apigateway"

interface IProdutoDTO {
    id?: string
    nome?: string
    descricao?: String
    tipo?: number
    sentidoAbertura?: string
    tipoPorta?: string
    tipoEnchimento?: string
    fechadura?: string
    alturaPorta?: number
    larguraPorta?: number
    espessuraPorta?: number
    larguraBatatente?: number
    espessuraCanalAlizar?: number
    createdAt?: Date
    updatedAt?: Date
}

export { IProdutoDTO }
