import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("produtos")
class Produto {
    @PrimaryColumn()
    id?: string

    @Column({ name: "nome", nullable: true })
    nome?: string

    @Column({ name: "descricao", nullable: true })
    descricao?: string

    @Column({ name: "tipo", nullable: true })
    tipo?: number

    @Column({ name: "sentido_abertura", nullable: true })
    sentidoAbertura?: string

    @Column({ name: "tipo_porta", nullable: true })
    tipoPorta?: string

    @Column({ name: "tipo_enchimento", nullable: true })
    tipoEnchimento?: string

    @Column({ name: "fechadura", nullable: true })
    fechadura?: string

    @Column({ name: "altura_porta", type: "decimal", nullable: true })
    alturaPorta?: number

    @Column({ name: "largura_porta", type: "decimal", nullable: true })
    larguraPorta?: number

    @Column({ name: "espessura_porta", type: "decimal", nullable: true })
    espessuraPorta?: number

    @Column({ name: "largura_batatente", type: "decimal", nullable: true })
    larguraBatatente?: number

    @Column({ name: "espessura_canal_alizar", type: "decimal", nullable: true })
    espessuraCanalAlizar?: number

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

export { Produto }
