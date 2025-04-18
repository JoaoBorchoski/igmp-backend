import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Pedido } from '@modules/operacao/infra/typeorm/entities/pedido'

@Entity('pedidos_items')
class PedidoItem {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Pedido, { nullable: true, eager: true })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  pedidoId?: string

  @Column({ name: 'produto', nullable: true })
  produto?: string

  @Column({ name: 'quantidade', nullable: true })
  quantidade?: Number

  @Column({ name: 'cor_etiqueta', nullable: true })
  corEtiqueta?: string

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

export { PedidoItem }
