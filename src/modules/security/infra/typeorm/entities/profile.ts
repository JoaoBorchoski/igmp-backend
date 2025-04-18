import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'

@Entity('profiles')
class Profile {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => UserGroup, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_group_id', referencedColumnName: 'id' })
  userGroupId?: string

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

export { Profile }
