import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateNegociacao9944739540025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "negociacao",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "medicao_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "cliente_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "status_negociacao_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "funcionario_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "data_criacao",
            type: "date",
            isNullable: true,
          },
          {
            name: "data_fechamento",
            type: "date",
            isNullable: true,
          },
          {
            name: "valor_estimado",
            type: "decimal",
            isNullable: true,
          },
          {
            name: "descricao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "motivo_perda",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKMedicaoNegociacaoMedicaoId",
            referencedTableName: "medicao",
            referencedColumnNames: ["id"],
            columnNames: ["medicao_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKClienteNegociacaoClienteId",
            referencedTableName: "clientes",
            referencedColumnNames: ["id"],
            columnNames: ["cliente_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKStatusNegociacaoNegociacaoStatusNegociacaoId",
            referencedTableName: "status_negociacao",
            referencedColumnNames: ["id"],
            columnNames: ["status_negociacao_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKFuncionarioNegociacaoFuncionarioId",
            referencedTableName: "funcionarios",
            referencedColumnNames: ["id"],
            columnNames: ["funcionario_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("negociacao")
  }
}
