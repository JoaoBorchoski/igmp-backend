import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePedido1744739540013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedidos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'sequencial',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'cliente',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telefone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complemento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estado_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cidade_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
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
            name: 'FKEstadoPedidoEstadoId',
            referencedTableName: 'estados',
            referencedColumnNames: ['id'],
            columnNames: ['estado_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCidadePedidoCidadeId',
            referencedTableName: 'cidades',
            referencedColumnNames: ['id'],
            columnNames: ['cidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pedidos')
  }
}
