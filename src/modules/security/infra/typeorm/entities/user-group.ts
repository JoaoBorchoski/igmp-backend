import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('user_groups')
class UserGroup {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'disabled', nullable: true, default: false })
  disabled?: boolean

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

export { UserGroup }
