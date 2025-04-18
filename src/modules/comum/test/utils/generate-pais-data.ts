import { faker } from '@faker-js/faker'

export function generateNewPaisData(overide = {}) {
  return {
    codigoPais: faker.datatype.string(60),
    nomePais: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePaisData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    codigoPais: faker.datatype.string(60),
    nomePais: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePaisesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePaisData(overide)
    }
  )
}
