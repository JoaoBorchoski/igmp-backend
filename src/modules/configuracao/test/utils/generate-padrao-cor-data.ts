import { faker } from '@faker-js/faker'

export function generateNewPadraoCorData(overide = {}) {
  return {
    nome: faker.datatype.string(50),
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePadraoCorData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(50),
    descricao: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePadroesCoresData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePadraoCorData(overide)
    }
  )
}
