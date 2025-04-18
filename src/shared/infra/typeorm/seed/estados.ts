import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO estados (
      id,
      codigo_ibge,
      uf,
      nome_estado,
      created_at,
      updated_at
    ) values 
      ('70086d51-9cf3-4c4f-b80b-43f4a4d1da70', '11', 'RO', 'Rondônia', 'now()', 'now()'),
      ('6b23a16b-26ee-4de0-abb0-fe274f6cd8d2', '12', 'AC', 'Acre', 'now()', 'now()'),
      ('140de48c-2ada-44ed-ad31-5f979a09c85b', '13', 'AM', 'Amazonas', 'now()', 'now()'),
      ('eb7a3ebf-783e-46a4-b15a-0e2bbf0287b1', '14', 'RR', 'Roraima', 'now()', 'now()'),
      ('f65e64d6-6e2f-4629-8244-43a44168de98', '15', 'PA', 'Pará', 'now()', 'now()'),
      ('b9079817-9a62-4771-8c1d-134e839eec27', '16', 'AP', 'Amapá', 'now()', 'now()'),
      ('db49c4fc-a0fa-497b-a4f7-ed246e8b5362', '17', 'TO', 'Tocantins', 'now()', 'now()'),
      ('9803e500-0abb-4a4d-b569-4ed9c56e31a1', '21', 'MA', 'Maranhão', 'now()', 'now()'),
      ('ab739b90-45c3-48e5-b16c-60bac2fae645', '22', 'PI', 'Piauí', 'now()', 'now()'),
      ('04a2bc32-3a8c-4c2d-ac19-f949590d70b4', '23', 'CE', 'Ceará', 'now()', 'now()'),
      ('4dc1c60e-898d-4c20-add7-88ff9f6819a0', '24', 'RN', 'Rio Grande do Norte', 'now()', 'now()'),
      ('6d53ba8c-a2cc-47b0-91ba-39813426dfb4', '25', 'PB', 'Paraíba', 'now()', 'now()'),
      ('44346164-4bec-478d-8d68-4cf4c8b1d248', '26', 'PE', 'Pernambuco', 'now()', 'now()'),
      ('905b1803-73e0-4216-8e2a-3cf1ab126ea5', '27', 'AL', 'Alagoas', 'now()', 'now()'),
      ('0d674188-94d3-4d1b-b10f-05a4b470bd2c', '28', 'SE', 'Sergipe', 'now()', 'now()'),
      ('84231770-82af-47fc-abd0-19e5c1372b8f', '29', 'BA', 'Bahia', 'now()', 'now()'),
      ('b0c73c6e-0003-4edf-a4bf-ae1d167bc2b5', '31', 'MG', 'Minas Gerais', 'now()', 'now()'),
      ('01dd3475-264c-459c-b6d5-44f591c038e4', '32', 'ES', 'Espírito Santo', 'now()', 'now()'),
      ('8566aae1-f04c-4190-aba7-ad442b2e7996', '33', 'RJ', 'Rio de Janeiro', 'now()', 'now()'),
      ('f9a5a4b5-ee58-4d90-ac66-715bc004f11e', '35', 'SP', 'São Paulo', 'now()', 'now()'),
      ('de12c2b4-b75d-4ec2-adfa-d6910396328e', '41', 'PR', 'Paraná', 'now()', 'now()'),
      ('2a4903c8-5369-4404-834c-bf0e365fc1d2', '42', 'SC', 'Santa Catarina', 'now()', 'now()'),
      ('3ca43fd7-db97-449f-9cc4-2cc0fdfbc601', '43', 'RS', 'Rio Grande do Sul', 'now()', 'now()'),
      ('a56c8611-bc18-4fef-a9ae-10bb56829601', '50', 'MS', 'Mato Grosso do Sul', 'now()', 'now()'),
      ('fc85e92b-644d-4e8c-8b5b-7287cf4bf7ad', '51', 'MT', 'Mato Grosso', 'now()', 'now()'),
      ('5c817a0b-0a48-49c1-8bf0-83386e176976', '52', 'GO', 'Goiás', 'now()', 'now()'),
      ('f2dd5787-44e1-48bb-bf9b-059b582c0eaf', '53', 'DF', 'Distrito Federal', 'now()', 'now()')
    `
  )

  await connection.close()
}

export async function estados() {
  await create().then(() => console.log('Tabela de estados criada!'))
}
