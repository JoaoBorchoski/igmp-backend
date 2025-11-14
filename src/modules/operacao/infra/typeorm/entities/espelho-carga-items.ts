import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { EspelhoCarga } from "@modules/operacao/infra/typeorm/entities/espelho-carga"
import { PacoteItem } from "@modules/operacao/infra/typeorm/entities/pacote-item"

@Entity("espelho_carga_items")
class EspelhoCargaItems {
	@PrimaryColumn()
	id?: string

	@ManyToOne(() => EspelhoCarga, { nullable: true, eager: true })
	@JoinColumn({ name: "espelho_carga_id", referencedColumnName: "id" })
	espelhoCargaId?: string

	@ManyToOne(() => PacoteItem, { nullable: true, eager: true })
	@JoinColumn({ name: "pacote_item_id", referencedColumnName: "id" })
	pacoteItemId?: string

	@Column({ name: "quantidade", nullable: true })
	quantidade?: number

	@Column({ name: "confirmado", nullable: true })
	confirmado?: boolean = false

	@CreateDateColumn({ name: "created_at", nullable: true })
	createdAt?: Date

	@UpdateDateColumn({ name: "updated_at", nullable: true })
	updatedAt?: Date

	constructor() {
		if (!this.id) {
			this.id = uuidV4()
		}
	}
}

export { EspelhoCargaItems }
