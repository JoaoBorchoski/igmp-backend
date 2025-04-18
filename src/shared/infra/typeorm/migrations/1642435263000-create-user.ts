import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1642435263000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_group_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'login',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_admin',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'is_super_user',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'is_blocked',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'block_reason_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'must_change_password_next_logon',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'must_active_two_factor_authentication',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_disabled',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'tfa',
            type: 'json',
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
            name: 'FKUserGroupUser',
            referencedTableName: 'user_groups',
            referencedColumnNames: ['id'],
            columnNames: ['user_group_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKBlockReasonUser',
            referencedTableName: 'block_reasons',
            referencedColumnNames: ['id'],
            columnNames: ['block_reason_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
