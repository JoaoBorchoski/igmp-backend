import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Expose } from 'class-transformer'
import { v4 as uuidV4 } from 'uuid'

import { UserGroup } from '@modules/security/infra/typeorm/entities/user-group'
import { BlockReason } from '@modules/security/infra/typeorm/entities/block-reason'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => UserGroup, { nullable: true, eager: true })
  @JoinColumn({ name: 'user_group_id', referencedColumnName: 'id' })
  userGroupId?: string

  @Column({ name: 'name', nullable: true })
  name: string

  @Column({ name: 'login', nullable: true })
  login: string

  @Column({ name: 'password', nullable: true })
  password: string

  @Column({ name: 'is_admin', nullable: true })
  isAdmin: boolean

  @Column({ name: 'is_super_user', nullable: true })
  isSuperUser: boolean

  @Column({ name: 'is_blocked', nullable: true })
  isBlocked: boolean

  @ManyToOne(() => BlockReason, { nullable: true, eager: true })
  @JoinColumn({ name: 'block_reason_id', referencedColumnName: 'id' })
  blockReasonId?: string

  @Column({ name: 'must_change_password_next_logon', nullable: true, default: false })
  mustChangePasswordNextLogon?: boolean

  @Column({ name: 'must_active_two_factor_authentication', nullable: true, default: false })
  mustActiveTwoFactorAuthentication?: boolean

  @Column({ name: 'avatar', nullable: true })
  avatar: string

  @Column({ name: 'is_disabled', nullable: true })
  isDisabled: boolean

  @Column({ name: 'tfa', nullable: true, default: false, type: 'json' })
  tfa: {
    secret?: string,
    tempSecret?: string,
    dataURL?: string,
    tfaURL?: string
  }

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date

  @Expose({ name: 'avatarUrl' })
  avatarUrl(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }
