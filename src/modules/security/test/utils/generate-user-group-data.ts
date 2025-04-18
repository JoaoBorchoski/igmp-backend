import { faker } from '@faker-js/faker'

export function generateNewUserGroupData(overide = {}) {
  return {
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUserGroupData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUserGroupsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserGroupData(overide)
    }
  )
}
