import { faker } from '@faker-js/faker'

export function generateNewPedidoData(overide = {}) {
  return {
    cliente: faker.datatype.string(100),
    telefone: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    bairro: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    status: faker.datatype.string(100),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePedidoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    cliente: faker.datatype.string(100),
    telefone: faker.datatype.string(100),
    cep: faker.datatype.string(10),
    endereco: faker.datatype.string(100),
    numero: faker.datatype.string(10),
    complemento: faker.datatype.string(100),
    bairro: faker.datatype.string(100),
    estadoId: null,
    cidadeId: null,
    status: faker.datatype.string(100),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePedidosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePedidoData(overide)
    }
  )
}
