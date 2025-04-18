import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMedicao9944739540024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "medicao",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "cadastro_obra_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "complemento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "espessura_parede",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "largura_vaos_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "altura_vaos_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "tipo_enchimento_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "tipo_porta_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "confirmacao",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          // {
          //   name: "complemento_origem_id",
          //   type: "uuid",
          //   isNullable: true,
          // },
          {
            name: "sentido_abertura_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "alizar_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "fechadura_id",
            type: "uuid",
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
            name: "FKMedicaoCadastroObraId",
            referencedTableName: "cadastro_obra",
            referencedColumnNames: ["id"],
            columnNames: ["cadastro_obra_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKLarguraVaosMedicaoLarguraVaosId",
            referencedTableName: "largura_vaos",
            referencedColumnNames: ["id"],
            columnNames: ["largura_vaos_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKAlturaVaosMedicaoAlturaVaosId",
            referencedTableName: "altura_vaos",
            referencedColumnNames: ["id"],
            columnNames: ["altura_vaos_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKTipoEnchimentoMedicaoTipoEnchimentoId",
            referencedTableName: "tipo_enchimento",
            referencedColumnNames: ["id"],
            columnNames: ["tipo_enchimento_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKTipoPortaMedicaoTipoPortaId",
            referencedTableName: "tipo_porta",
            referencedColumnNames: ["id"],
            columnNames: ["tipo_porta_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          // {
          //   name: "FKMedicaoComplementoOrigemId",
          //   referencedTableName: "complemento_origem",
          //   referencedColumnNames: ["id"],
          //   columnNames: ["complemento_origem_id"],
          //   onDelete: "SET NULL",
          //   onUpdate: "SET NULL",
          // },
          {
            name: "FKSentidoAberturaMedicaoSentidoAberturaId",
            referencedTableName: "sentido_abertura",
            referencedColumnNames: ["id"],
            columnNames: ["sentido_abertura_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKAlizarMedicaoAlizarId",
            referencedTableName: "alizar",
            referencedColumnNames: ["id"],
            columnNames: ["alizar_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKFechaduraMedicaoFechaduraId",
            referencedTableName: "fechadura",
            referencedColumnNames: ["id"],
            columnNames: ["fechadura_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("medicao")
  }
}
