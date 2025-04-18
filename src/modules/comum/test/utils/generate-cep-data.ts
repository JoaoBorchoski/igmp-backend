import { faker } from '@faker-js/faker'

export function generateNewCepData(overide = {}) {
  return {
    codigoCep: faker.datatype.string(8),
    logradouro: faker.datatype.string(60),
    bairro: faker.datatype.string(60),
    estadoId: null,
    cidadeId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCepData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    codigoCep: faker.datatype.string(8),
    logradouro: faker.datatype.string(60),
    bairro: faker.datatype.string(60),
    estadoId: null,
    cidadeId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCepsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCepData(overide)
    }
  )
}
