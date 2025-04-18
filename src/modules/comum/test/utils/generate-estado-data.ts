import { faker } from '@faker-js/faker'

export function generateNewEstadoData(overide = {}) {
  return {
    codigoIbge: faker.datatype.string(60),
    uf: faker.datatype.string(2),
    nomeEstado: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEstadoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    codigoIbge: faker.datatype.string(60),
    uf: faker.datatype.string(2),
    nomeEstado: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateEstadosData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateEstadoData(overide)
    }
  )
}
