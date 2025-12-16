interface IPacoteItemDTO {
	id?: string
	pacoteId?: string
	produto?: string
	quantidade?: number
	createdAt?: Date
	updatedAt?: Date
	quantidadeLateral?: number
	quantidadeCabeceira?: number
	quantidadeLateralCabeceira?: number
	tipoItem?: number
	confirmado?: boolean
	descricao?: string
}

export { IPacoteItemDTO }
