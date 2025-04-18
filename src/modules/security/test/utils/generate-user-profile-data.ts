import { faker } from '@faker-js/faker'

export function generateNewUserProfileData(overide = {}) {
  return {
    userId: null,
    profileId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUserProfileData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userId: null,
    profileId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUsersProfilesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserProfileData(overide)
    }
  )
}
