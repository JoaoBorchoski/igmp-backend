import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Module } from '@modules/security/infra/typeorm/entities/module'

@Entity('menu_options')
class MenuOption {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Module, { nullable: true, eager: true })
  @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
  moduleId?: string

  @Column({ name: 'sequence', nullable: true })
  sequence?: string

  @Column({ name: 'label', nullable: true })
  label?: string

  @Column({ name: 'route', nullable: true })
  route?: string

  @Column({ name: 'icon', nullable: true })
  icon?: string

  @Column({ name: 'key', nullable: true })
  key?: string

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

export { MenuOption }
