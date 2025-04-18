import { faker } from '@faker-js/faker'

export function generateNewMenuOptionData(overide = {}) {
  return {
    moduleId: null,
    sequence: faker.datatype.string(20),
    label: faker.datatype.string(60),
    route: faker.datatype.string(100),
    icon: faker.datatype.string(20),
    key: faker.datatype.string(255),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMenuOptionData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    moduleId: null,
    sequence: faker.datatype.string(20),
    label: faker.datatype.string(60),
    route: faker.datatype.string(100),
    icon: faker.datatype.string(20),
    key: faker.datatype.string(255),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMenuOptionsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateMenuOptionData(overide)
    }
  )
}
