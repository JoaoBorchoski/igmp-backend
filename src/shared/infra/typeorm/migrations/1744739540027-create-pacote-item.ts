import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePacoteItem1744739540027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pacotes_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'pacote_id',
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
            name: 'FKPacotePacoteItemPacoteId',
            referencedTableName: 'pacotes',
            referencedColumnNames: ['id'],
            columnNames: ['pacote_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pacotes_items')
  }
}
