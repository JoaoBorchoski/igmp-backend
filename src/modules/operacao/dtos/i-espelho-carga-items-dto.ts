interface IEspelhoCargaItemsDTO {
	id?: string
	espelhoCargaId?: string
	pacoteItemId?: string
	quantidade?: number
	confirmado?: boolean
	descarregado?: boolean
	createdAt?: Date
	updatedAt?: Date
}

export { IEspelhoCargaItemsDTO }
