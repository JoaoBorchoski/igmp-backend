import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCadastroObra9944739540020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cadastro_obra",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cliente",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cnpj",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "endereco",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "responsavel_obra",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "contato",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "previsao_entrega",
            type: "date",
            isNullable: true,
          },
          {
            name: "tipo_obra",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "plantas_iguais",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "qtd_casas",
            type: "int",
            isNullable: true,
          },
          {
            name: "grupo_casas",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "estrutura_predio",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "qtd_apto_por_andar",
            type: "int",
            isNullable: true,
          },
          {
            name: "andares",
            type: "int",
            isNullable: true,
          },
          {
            name: "qtd_aptos",
            type: "int",
            isNullable: true,
          },
          {
            name: "grupo_andares",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "padrao_cor_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "solida_madeirada",
            type: "varchar",
            isNullable: true,
          },
          // {
          //   name: 'cores_tipos_id',
          //   type: 'uuid',
          //   isNullable: true,
          // },
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
            name: "FKPadraoCorCadastroObraPadraoCorId",
            referencedTableName: "padrao_cor",
            referencedColumnNames: ["id"],
            columnNames: ["padrao_cor_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          // {
          //   name: 'FKCadastroObraCoresTiposId',
          //   referencedTableName: 'cores_tipos',
          //   referencedColumnNames: ['id'],
          //   columnNames: ['cores_tipos_id'],
          //   onDelete: 'SET NULL',
          //   onUpdate: 'SET NULL',
          // }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cadastro_obra")
  }
}
