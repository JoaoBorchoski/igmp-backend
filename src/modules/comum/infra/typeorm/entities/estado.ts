import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('estados')
class Estado {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'codigo_ibge', nullable: true })
  codigoIbge?: string

  @Column({ name: 'uf', nullable: true })
  uf?: string

  @Column({ name: 'nome_estado', nullable: true })
  nomeEstado?: string

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

export { Estado }
