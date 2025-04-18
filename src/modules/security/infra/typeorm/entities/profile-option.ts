import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Profile } from '@modules/security/infra/typeorm/entities/profile'

@Entity('profile_options')
class ProfileOption {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Profile, { nullable: true, eager: true })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profileId?: string

  @Column({ name: 'menu_option_key', nullable: true })
  menuOptionKey?: string

  @Column({ name: 'permit_all', nullable: true, default: false })
  permitAll?: boolean

  @Column({ name: 'permit_create', nullable: true, default: false })
  permitCreate?: boolean

  @Column({ name: 'permit_restore', nullable: true, default: false })
  permitRestore?: boolean

  @Column({ name: 'permit_update', nullable: true, default: false })
  permitUpdate?: boolean

  @Column({ name: 'permit_delete', nullable: true, default: false })
  permitDelete?: boolean

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

export { ProfileOption }
