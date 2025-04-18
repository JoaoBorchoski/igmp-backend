import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProfileOption1654852495008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_options',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'profile_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'menu_option_key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'permit_all',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'permit_create',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'permit_restore',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'permit_update',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'permit_delete',
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
          {
            name: 'FKProfileProfileOption',
            referencedTableName: 'profiles',
            referencedColumnNames: ['id'],
            columnNames: ['profile_id'],
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profile_options')
  }
}
