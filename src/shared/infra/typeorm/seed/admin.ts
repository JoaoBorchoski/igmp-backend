import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'igmp', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash(btoa('admin'), 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      login, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@igmp.com', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

  await connection.query(
    `INSERT INTO modules (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('fce24e0c-0122-41a9-aeb8-35e094434755', 'Tabelas', 'now()', 'now()'),
			('569c3d80-982e-4142-9f9a-f7980d48b796', 'Configuração', 'now()', 'now()'),
			('d47e7b79-27cd-4fbf-b927-ef76f80da262', 'Operação', 'now()', 'now()')`
  )


  // menu options

  await connection.query(
    `INSERT INTO menu_options (
      id,
      module_id,
      sequence,
      label,
      route,
      icon,
      key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'fa-solid fa-lock', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('9e817d01-b5fa-454d-956a-2428e7498857', 'fce24e0c-0122-41a9-aeb8-35e094434755', '002', 'Tabelas', '', 'fa-solid fa-table', 'comum', 'now()', 'now()'),
			('2b47fb42-051b-4ccd-b082-9b9c94fe6392', 'fce24e0c-0122-41a9-aeb8-35e094434755', '002001', 'Países', '/paises', 'public', 'comum-paises', 'now()', 'now()'),
			('53d9b57a-7e73-492b-b6a6-f648b1b240b0', 'fce24e0c-0122-41a9-aeb8-35e094434755', '002002', 'Estados', '/estados', 'public', 'comum-estados', 'now()', 'now()'),
			('f195cb2d-1879-437b-aa24-c463f87f9794', 'fce24e0c-0122-41a9-aeb8-35e094434755', '002003', 'Cidades', '/cidades', 'apartment', 'comum-cidades', 'now()', 'now()'),
			('4ff60a3c-c364-4d92-8ba5-c29dadf76c19', 'fce24e0c-0122-41a9-aeb8-35e094434755', '002004', 'CEP', '/ceps', 'groups', 'comum-ceps', 'now()', 'now()'),
			('1623f806-c504-4481-a03b-5cb65a830a1d', '569c3d80-982e-4142-9f9a-f7980d48b796', '003', 'Configuração', '', 'fa-solid fa-sliders', 'configuracao', 'now()', 'now()'),
			('76748917-446c-4a25-b65e-4f6ca05d03dc', '569c3d80-982e-4142-9f9a-f7980d48b796', '003001', 'Funcionarios', '/funcionarios', 'sell', 'configuracao-funcionarios', 'now()', 'now()'),
			('15665d25-8abd-4d28-8b0c-a8514c664df8', '569c3d80-982e-4142-9f9a-f7980d48b796', '003002', 'Clientes', '/clientes', 'sell', 'configuracao-clientes', 'now()', 'now()'),
			('bd8acb58-dac0-4ddc-a7ae-0a2e22d53775', '569c3d80-982e-4142-9f9a-f7980d48b796', '003003', 'PadroesCores', '/padroes-cores', 'sell', 'configuracao-padroes-cores', 'now()', 'now()'),
			('d83fc740-7879-44ac-b6fc-7a828232fa32', '569c3d80-982e-4142-9f9a-f7980d48b796', '003004', 'TiposEnchimento', '/tipos-enchimento', 'sell', 'configuracao-tipos-enchimento', 'now()', 'now()'),
			('2b9811c9-eba5-4171-8c53-584214d2053c', '569c3d80-982e-4142-9f9a-f7980d48b796', '003005', 'SentidosAbertura', '/sentidos-abertura', 'sell', 'configuracao-sentidos-abertura', 'now()', 'now()'),
			('a96bf801-c929-4b26-b857-1c8cb1e7b606', '569c3d80-982e-4142-9f9a-f7980d48b796', '003006', 'TiposPorta', '/tipos-porta', 'sell', 'configuracao-tipos-porta', 'now()', 'now()'),
			('887e46f0-76c9-4a95-bafe-0abe26ae93a9', '569c3d80-982e-4142-9f9a-f7980d48b796', '003007', 'Fechaduras', '/fechaduras', 'sell', 'configuracao-fechaduras', 'now()', 'now()'),
			('39944837-3ed5-4b6d-aa97-9f18b219c5ab', '569c3d80-982e-4142-9f9a-f7980d48b796', '003008', 'Alizares', '/alizares', 'sell', 'configuracao-alizares', 'now()', 'now()'),
			('cf703cda-a6ed-45f1-92b0-7feeaab77446', '569c3d80-982e-4142-9f9a-f7980d48b796', '003009', 'LargurasVaos', '/larguras-vaos', 'sell', 'configuracao-larguras-vaos', 'now()', 'now()'),
			('86af77b2-6311-4664-8e59-77afefe48db2', '569c3d80-982e-4142-9f9a-f7980d48b796', '003010', 'AlturasVaos', '/alturas-vaos', 'sell', 'configuracao-alturas-vaos', 'now()', 'now()'),
			('5ae04ed4-5c53-48ab-aaf5-2d96a3eddbe0', '569c3d80-982e-4142-9f9a-f7980d48b796', '003011', 'StatusNegociacoes', '/status-negociacoes', 'sell', 'configuracao-status-negociacoes', 'now()', 'now()'),
			('0c21ec84-7962-4e5c-aaf3-b6a3c25b2aac', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004', 'Operação', '', 'fa-solid fa-gear', 'operacao', 'now()', 'now()'),
			('7ef4741d-27fc-4e87-81b6-c37fc2a16966', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004001', 'Pedidos', '/pedidos', 'List', 'operacao-pedidos', 'now()', 'now()'),
			('a7957164-1e19-43d4-a757-7729d9f9777f', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004002', 'Pedidos Items', '/pedidos-items', 'List', 'operacao-pedidos-items', 'now()', 'now()'),
			('5be65dd4-b6d7-4ead-abe3-ddcec831d589', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004003', 'Pacotes', '/pacotes', 'List', 'operacao-pacotes', 'now()', 'now()'),
			('949d5187-17cb-411e-aad9-1f543889485f', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004004', 'Pacotes Items', '/pacotes-items', 'List', 'operacao-pacotes-items', 'now()', 'now()'),
			('b891bd49-b293-44e6-9f08-f2e65f20655b', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004005', 'Cadastro Obras', '/cadastro-obras', 'sell', 'operacao-cadastro-obras', 'now()', 'now()'),
			('bedf7678-ce5e-4b6b-9059-9654059c2ee5', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004006', 'Medicoes', '/medicoes', 'sell', 'operacao-medicoes', 'now()', 'now()'),
			('3a3dcc50-9d1b-4d8a-8b59-9452fa7a67ff', 'd47e7b79-27cd-4fbf-b927-ef76f80da262', '004007', 'Negociacoes', '/negociacoes', 'sell', 'operacao-negociacoes', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('52bc30e1-17bc-45d2-908c-5d5ddf0e1b05', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum', true, 'now()', 'now()'),
			('8fa6166d-a887-4717-8d57-a94128c35ec5', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-paises', true, 'now()', 'now()'),
			('68dcb71b-b945-40b1-833e-2d26547280b7', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-estados', true, 'now()', 'now()'),
			('180d359c-5ee4-4f95-bcf6-274a742ec94d', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-cidades', true, 'now()', 'now()'),
			('fbcb0a94-88ba-43d2-af08-de6126a6d375', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-ceps', true, 'now()', 'now()'),
			('11d0037a-824f-4ce9-916c-94673890844d', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao', true, 'now()', 'now()'),
			('75a55894-9f6a-41a8-8f2a-ba27204cec4e', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-funcionarios', true, 'now()', 'now()'),
			('e5f1b0b4-bb2b-411a-961c-f24d3a82124e', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-clientes', true, 'now()', 'now()'),
			('0e21f575-71c1-4d1f-bd8f-9324525df752', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-padroes-cores', true, 'now()', 'now()'),
			('3782e160-18c8-447b-afdf-6e8558c7b2aa', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-tipos-enchimento', true, 'now()', 'now()'),
			('ed033485-d3ed-4984-a806-4c93e0671d68', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-sentidos-abertura', true, 'now()', 'now()'),
			('f753e2f4-351d-4da8-9748-6e21cfe32887', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-tipos-porta', true, 'now()', 'now()'),
			('94363aa5-685b-4fdc-9224-0ba4724922c1', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-fechaduras', true, 'now()', 'now()'),
			('3b3955f9-968a-493b-84e5-101658a78025', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-alizares', true, 'now()', 'now()'),
			('ff90fae6-af4c-402a-8606-8f53642c6c89', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-larguras-vaos', true, 'now()', 'now()'),
			('60e3a7f5-5fc9-4c2c-b30c-155b8a2a6fc6', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-alturas-vaos', true, 'now()', 'now()'),
			('df0f1f03-6bc1-488e-9297-1bd4c2d61536', '3c99decf-f975-4b16-b552-0747afd397a3', 'configuracao-status-negociacoes', true, 'now()', 'now()'),
			('f6418686-6ee4-430d-af61-9d873e853c36', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao', true, 'now()', 'now()'),
			('e3a2b1a2-7371-45d2-a4d3-260d76ba2b6f', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-pedidos', true, 'now()', 'now()'),
			('6b181025-c3ac-4461-bdac-024ef84bcdd2', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-pedidos-items', true, 'now()', 'now()'),
			('715d15ea-3d11-4fb4-896b-b3202682d9df', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-pacotes', true, 'now()', 'now()'),
			('3f1a1788-40bf-4d8f-9b1a-1c3c9da4f7cf', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-pacotes-items', true, 'now()', 'now()'),
			('ac81c977-f0a6-4d39-83af-bf1d66d5407b', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-cadastro-obras', true, 'now()', 'now()'),
			('d9f3b153-2181-4027-9741-1c0c50a05efb', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-medicoes', true, 'now()', 'now()'),
			('bb551f1e-4999-4b0d-844c-5303d3bf3b10', '3c99decf-f975-4b16-b552-0747afd397a3', 'operacao-negociacoes', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  
  // configs

  await connection.query(
    `INSERT INTO configs (
      id,
      title,
      description,
      created_at,
      updated_at
    ) values 
      ('62e4bde6-56f0-4dae-b06a-c3ffcbd58047', 'email', '{"service":"gmail","smtpHost":"smtp.gmail.com","smtpPort":587,"smtpUser":"desenvweb@vamilly.com.br","smtpPass":"NCjEr<N39AUb3bC<"}', 'now()', 'now()')`
  )

  await connection.close()
}

export async function admin() {
  await create().then(() => console.log('Admin and Security tables created!'))
}
