import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { LarguraVaos } from "@modules/configuracao/infra/typeorm/entities/largura-vaos"
import { AlturaVaos } from "@modules/configuracao/infra/typeorm/entities/altura-vaos"
import { TipoEnchimento } from "@modules/configuracao/infra/typeorm/entities/tipo-enchimento"
import { TipoPorta } from "@modules/configuracao/infra/typeorm/entities/tipo-porta"
import { SentidoAbertura } from "@modules/configuracao/infra/typeorm/entities/sentido-abertura"
import { Alizar } from "@modules/configuracao/infra/typeorm/entities/alizar"
import { Fechadura } from "@modules/configuracao/infra/typeorm/entities/fechadura"
import { CadastroObra } from "./cadastro-obra"

@Entity("medicao")
class Medicao {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => CadastroObra, { nullable: true, eager: true })
  @JoinColumn({ name: "cadastro_obra_id", referencedColumnName: "id" })
  cadastroObraId?: string

  @Column({ name: "complemento", nullable: true })
  complemento?: string

  @Column({ name: "espessura_parede", nullable: true })
  espessuraParede?: string

  @ManyToOne(() => LarguraVaos, { nullable: true, eager: true })
  @JoinColumn({ name: "largura_vaos_id", referencedColumnName: "id" })
  larguraVaosId?: string

  @ManyToOne(() => AlturaVaos, { nullable: true, eager: true })
  @JoinColumn({ name: "altura_vaos_id", referencedColumnName: "id" })
  alturaVaosId?: string

  @ManyToOne(() => TipoEnchimento, { nullable: true, eager: true })
  @JoinColumn({ name: "tipo_enchimento_id", referencedColumnName: "id" })
  tipoEnchimentoId?: string

  @ManyToOne(() => TipoPorta, { nullable: true, eager: true })
  @JoinColumn({ name: "tipo_porta_id", referencedColumnName: "id" })
  tipoPortaId?: string

  @Column({ name: "confirmacao", nullable: true, default: false })
  confirmacao?: boolean

  // @ManyToOne(() => , { nullable: true, eager: true })
  // @JoinColumn({ name: 'complemento_origem_id', referencedColumnName: 'id' })
  // complementoOrigemId?: string

  @ManyToOne(() => SentidoAbertura, { nullable: true, eager: true })
  @JoinColumn({ name: "sentido_abertura_id", referencedColumnName: "id" })
  sentidoAberturaId?: string

  @ManyToOne(() => Alizar, { nullable: true, eager: true })
  @JoinColumn({ name: "alizar_id", referencedColumnName: "id" })
  alizarId?: string

  @ManyToOne(() => Fechadura, { nullable: true, eager: true })
  @JoinColumn({ name: "fechadura_id", referencedColumnName: "id" })
  fechaduraId?: string

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

export { Medicao }
