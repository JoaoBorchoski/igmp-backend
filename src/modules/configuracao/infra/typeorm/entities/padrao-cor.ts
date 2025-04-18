import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('padrao_cor')
class PadraoCor {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

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

export { PadraoCor }
