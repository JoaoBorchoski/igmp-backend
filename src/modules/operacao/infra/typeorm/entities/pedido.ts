import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { Estado } from "@modules/comum/infra/typeorm/entities/estado"
import { Cidade } from "@modules/comum/infra/typeorm/entities/cidade"

@Entity("pedidos")
class Pedido {
    @PrimaryColumn()
    id?: string

    @Column({ name: "sequencial", nullable: true })
    sequencial?: Number

    @Column({ name: "cliente", nullable: true })
    cliente?: string

    @Column({ name: "descricao", nullable: true })
    descricao?: string

    @Column({ name: "telefone", nullable: true })
    telefone?: string

    @Column({ name: "cep", nullable: true })
    cep?: string

    @Column({ name: "endereco", nullable: true })
    endereco?: string

    @Column({ name: "numero", nullable: true })
    numero?: string

    @Column({ name: "complemento", nullable: true })
    complemento?: string

    @Column({ name: "bairro", nullable: true })
    bairro?: string

    @ManyToOne(() => Estado, { nullable: true, eager: true })
    @JoinColumn({ name: "estado_id", referencedColumnName: "id" })
    estadoId?: string

    @ManyToOne(() => Cidade, { nullable: true, eager: true })
    @JoinColumn({ name: "cidade_id", referencedColumnName: "id" })
    cidadeId?: string

    @Column({ name: "status", nullable: true })
    status?: string

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

export { Pedido }
