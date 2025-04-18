import { faker } from '@faker-js/faker'

export function generateNewModuleData(overide = {}) {
  return {
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateModuleData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateModulesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateModuleData(overide)
    }
  )
}
