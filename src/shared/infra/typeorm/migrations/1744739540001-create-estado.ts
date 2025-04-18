import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEstado1744739540001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estados',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'codigo_ibge',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nome_estado',
            type: 'varchar',
            isNullable: false,
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
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('estados')
  }
}
