import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { PadraoCor } from "@modules/configuracao/infra/typeorm/entities/padrao-cor"

@Entity("cadastro_obra")
class CadastroObra {
  @PrimaryColumn()
  id?: string

  @Column({ name: "nome", nullable: true })
  nome?: string

  @Column({ name: "cliente", nullable: true })
  cliente?: string

  @Column({ name: "cnpj", nullable: true })
  cnpj?: string

  @Column({ name: "endereco", nullable: true })
  endereco?: string

  @Column({ name: "responsavel_obra", nullable: true })
  responsavelObra?: string

  @Column({ name: "contato", nullable: true })
  contato?: string

  @Column({ name: "previsao_entrega", nullable: true, type: "timestamptz" })
  previsaoEntrega?: Date

  @Column({ name: "tipo_obra", nullable: true })
  tipoObra?: string

  @Column({ name: "plantas_iguais", nullable: true, default: false })
  plantasIguais?: boolean

  @Column({ name: "qtd_casas", nullable: true })
  qtdCasas?: Number

  @Column({ name: "grupo_casas", nullable: true })
  grupoCasas?: string

  @Column({ name: "estrutura_predio", nullable: true })
  estruturaPredio?: string

  @Column({ name: "qtd_apto_por_andar", nullable: true })
  qtdAptoPorAndar?: Number

  @Column({ name: "andares", nullable: true })
  andares?: Number

  @Column({ name: "qtd_aptos", nullable: true })
  qtdAptos?: Number

  @Column({ name: "grupo_andares", nullable: true })
  grupoAndares?: string

  @ManyToOne(() => PadraoCor, { nullable: true, eager: true })
  @JoinColumn({ name: "padrao_cor_id", referencedColumnName: "id" })
  padraoCorId?: string

  @Column({ name: "solida_madeirada", nullable: true })
  solidaMadeirada?: string

  // @ManyToOne(() => , { nullable: true, eager: true })
  // @JoinColumn({ name: 'cores_tipos_id', referencedColumnName: 'id' })
  // coresTiposId?: string

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

export { CadastroObra }
