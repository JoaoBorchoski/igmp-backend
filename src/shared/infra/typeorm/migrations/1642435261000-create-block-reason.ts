import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBlockReason1642435261000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'block_reasons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'instructions_to_solve',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_solved_by_password_reset',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: false,
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
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('block_reasons')
  }
}
