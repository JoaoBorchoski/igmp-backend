import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Pacote } from '@modules/operacao/infra/typeorm/entities/pacote'

@Entity('pacotes_items')
class PacoteItem {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Pacote, { nullable: true, eager: true })
  @JoinColumn({ name: 'pacote_id', referencedColumnName: 'id' })
  pacoteId?: string

  @Column({ name: 'produto', nullable: true })
  produto?: string

  @Column({ name: 'quantidade', nullable: true })
  quantidade?: Number

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

export { PacoteItem }
