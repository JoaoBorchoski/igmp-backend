interface IPedidoItemDTO {
  id?: string
  pedidoId?: string
  produto?: string
  quantidade?: number
  corEtiqueta?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IPedidoItemDTO }
