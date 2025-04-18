import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from './user'


@Entity('filters')
class Filter {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'expression', nullable: true })
  expression?: string

  @Column({ name: 'table', nullable: true })
  table?: string

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId?: string

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

export { Filter }
