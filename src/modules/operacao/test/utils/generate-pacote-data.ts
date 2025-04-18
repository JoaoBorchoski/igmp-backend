import { faker } from '@faker-js/faker'

export function generateNewPacoteData(overide = {}) {
  return {
    pedidoId: null,
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePacoteData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    pedidoId: null,
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePacotesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePacoteData(overide)
    }
  )
}
