import { faker } from '@faker-js/faker'

export function generateNewProfileData(overide = {}) {
  return {
    userGroupId: null,
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfileData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userGroupId: null,
    name: faker.datatype.string(60),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfilesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateProfileData(overide)
    }
  )
}
