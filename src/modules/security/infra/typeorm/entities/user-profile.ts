import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { User } from '@modules/security/infra/typeorm/entities/user'
import { Profile } from '@modules/security/infra/typeorm/entities/profile'

@Entity('users_profiles')
class UserProfile {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId?: string

  @ManyToOne(() => Profile, { nullable: true, eager: true })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profileId?: string

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

export { UserProfile }
