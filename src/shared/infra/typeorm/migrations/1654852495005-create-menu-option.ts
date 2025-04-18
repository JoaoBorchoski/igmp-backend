import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMenuOption1654852495005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menu_options',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'module_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sequence',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'label',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'route',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'key',
            type: 'varchar',
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
          {
            name: 'FKModuleMenuOption',
            referencedTableName: 'modules',
            referencedColumnNames: ['id'],
            columnNames: ['module_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menu_options')
  }
}
