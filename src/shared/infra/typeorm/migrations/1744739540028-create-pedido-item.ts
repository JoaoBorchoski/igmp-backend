import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePedidoItem1744739540028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedidos_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'pedido_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'produto',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'quantidade',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'cor_etiqueta',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKPedidoPedidoItemPedidoId',
            referencedTableName: 'pedidos',
            referencedColumnNames: ['id'],
            columnNames: ['pedido_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pedidos_items')
  }
}
