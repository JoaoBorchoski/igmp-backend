import { faker } from '@faker-js/faker'

export function generateNewNavigationData(overide = {}) {
  return {
    userId: null,
    route: faker.datatype.string(500),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateNavigationData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userId: null,
    route: faker.datatype.string(500),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateNavigationsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateNavigationData(overide)
    }
  )
}
