import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('configs')
class Config {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'title', nullable: true })
  title?: string

  @Column({ name: 'description', nullable: true, type: 'json' })
  description?: JSON

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

export { Config }
