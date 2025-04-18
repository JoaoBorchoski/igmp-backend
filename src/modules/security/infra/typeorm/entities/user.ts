import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'

@Entity('users')
class User {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => UserGroup, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_group_id', referencedColumnName: 'id' })
  userGroupId?: string

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'login', nullable: true })
  login?: string

  @Column({ name: 'password', nullable: true })
  password?: string

  @Column({ name: 'is_admin', nullable: true, default: false })
  isAdmin?: boolean

  @Column({ name: 'is_super_user', nullable: true, default: false })
  isSuperUser?: boolean

  @Column({ name: 'is_blocked', nullable: true, default: false })
  isBlocked?: boolean

  @ManyToOne(() => BlockReason, { nullable: true, eager: true })
  @JoinColumn({ name: 'block_reason_id', referencedColumnName: 'id' })
  blockReasonId?: string

  @Column({ name: 'must_change_password_next_logon', nullable: true, default: false })
  mustChangePasswordNextLogon?: boolean

  @Column({ name: 'must_active_two_factor_authentication', nullable: true, default: false })
  mustActiveTwoFactorAuthentication?: boolean

  @Column({ name: 'avatar', nullable: true })
  avatar?: string

  @Column({ name: 'is_disabled', nullable: true, default: false })
  isDisabled?: boolean

  @Column({ name: 'tfa', nullable: true, default: false, type: 'json' })
  tfa?: object

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

export { User }
