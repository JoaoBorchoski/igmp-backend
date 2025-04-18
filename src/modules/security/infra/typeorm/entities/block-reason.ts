import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('block_reasons')
class BlockReason {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'code', nullable: true })
  code?: string

  @Column({ name: 'description', nullable: true })
  description?: string

  @Column({ name: 'instructions_to_solve', nullable: true })
  instructionsToSolve?: string

  @Column({ name: 'is_solved_by_password_reset', nullable: true, default: false })
  isSolvedByPasswordReset?: boolean

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

export { BlockReason }
