import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('paises')
class Pais {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'codigo_pais', nullable: true })
  codigoPais?: string

  @Column({ name: 'nome_pais', nullable: true })
  nomePais?: string

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

export { Pais }
