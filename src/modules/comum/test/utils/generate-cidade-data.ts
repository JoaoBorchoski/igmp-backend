import { faker } from '@faker-js/faker'

export function generateNewCidadeData(overide = {}) {
  return {
    estadoId: null,
    codigoIbge: faker.datatype.string(60),
    nomeCidade: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCidadeData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    estadoId: null,
    codigoIbge: faker.datatype.string(60),
    nomeCidade: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCidadesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCidadeData(overide)
    }
  )
}
