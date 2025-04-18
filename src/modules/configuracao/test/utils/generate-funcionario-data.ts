import { faker } from '@faker-js/faker'

export function generateNewFuncionarioData(overide = {}) {
  return {
    nome: faker.datatype.string(45),
    cpf: faker.datatype.string(14),
    rg: faker.datatype.string(20),
    email: faker.datatype.string(200),
    cep: faker.datatype.string(10),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    bairro: faker.datatype.string(60),
    endereco: faker.datatype.string(255),
    numero: faker.datatype.number({ max: 9 }),
    complemento: faker.datatype.string(60),
    telefone: faker.datatype.string(10),
    observacoes: faker.datatype.string(255),
    usuarioId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFuncionarioData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(45),
    cpf: faker.datatype.string(14),
    rg: faker.datatype.string(20),
    email: faker.datatype.string(200),
    cep: faker.datatype.string(10),
    paisId: null,
    estadoId: null,
    cidadeId: null,
    bairro: faker.datatype.string(60),
    endereco: faker.datatype.string(255),
    numero: faker.datatype.number({ max: 9 }),
    complemento: faker.datatype.string(60),
    telefone: faker.datatype.string(10),
    observacoes: faker.datatype.string(255),
    usuarioId: null,
    desabilitado: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateFuncionariosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateFuncionarioData(overide)
    }
  )
}
