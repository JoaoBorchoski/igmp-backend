import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"
import { v4 as uuidV4 } from "uuid"

import { Medicao } from "@modules/operacao/infra/typeorm/entities/medicao"
import { Cliente } from "@modules/configuracao/infra/typeorm/entities/cliente"
import { StatusNegociacao } from "@modules/configuracao/infra/typeorm/entities/status-negociacao"
import { Funcionario } from "@modules/configuracao/infra/typeorm/entities/funcionario"

@Entity("negociacao")
class Negociacao {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Medicao, { nullable: true, eager: true })
  @JoinColumn({ name: "medicao_id", referencedColumnName: "id" })
  medicaoId?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: "cliente_id", referencedColumnName: "id" })
  clienteId?: string

  @ManyToOne(() => StatusNegociacao, { nullable: true, eager: true })
  @JoinColumn({ name: "status_negociacao_id", referencedColumnName: "id" })
  statusNegociacaoId?: string

  @ManyToOne(() => Funcionario, { nullable: true, eager: true })
  @JoinColumn({ name: "funcionario_id", referencedColumnName: "id" })
  funcionarioId?: string

  @Column({ name: "data_criacao", nullable: true, type: "timestamptz" })
  dataCriacao?: Date

  @Column({ name: "data_fechamento", nullable: true, type: "timestamptz" })
  dataFechamento?: Date

  @Column({ name: "valor_estimado", nullable: true })
  valorEstimado?: Number

  @Column({ name: "descricao", nullable: true })
  descricao?: string

  @Column({ name: "motivo_perda", nullable: true })
  motivoPerda?: string

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

export { Negociacao }
