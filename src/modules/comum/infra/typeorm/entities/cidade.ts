import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Estado } from '@modules/comum/infra/typeorm/entities/estado'

@Entity('cidades')
class Cidade {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Estado, { nullable: true, eager: true })
  @JoinColumn({ name: 'estado_id', referencedColumnName: 'id' })
  estadoId?: string

  @Column({ name: 'codigo_ibge', nullable: true })
  codigoIbge?: string

  @Column({ name: 'nome_cidade', nullable: true })
  nomeCidade?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Cidade }
