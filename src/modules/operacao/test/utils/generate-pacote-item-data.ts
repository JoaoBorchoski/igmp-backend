import { faker } from '@faker-js/faker'

export function generateNewPacoteItemData(overide = {}) {
  return {
    pacoteId: null,
    produto: faker.datatype.string(256),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePacoteItemData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    pacoteId: null,
    produto: faker.datatype.string(256),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePacotesItemsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePacoteItemData(overide)
    }
  )
}
