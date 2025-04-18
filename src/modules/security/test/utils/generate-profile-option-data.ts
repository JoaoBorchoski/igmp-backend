import { faker } from '@faker-js/faker'

export function generateNewProfileOptionData(overide = {}) {
  return {
    profileId: null,
    menuOptionKey: faker.datatype.string(255),
    permitAll: false,
    permitCreate: false,
    permitRestore: false,
    permitUpdate: false,
    permitDelete: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfileOptionData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    profileId: null,
    menuOptionKey: faker.datatype.string(255),
    permitAll: false,
    permitCreate: false,
    permitRestore: false,
    permitUpdate: false,
    permitDelete: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProfileOptionsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateProfileOptionData(overide)
    }
  )
}
