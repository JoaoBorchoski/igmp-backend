import { faker } from '@faker-js/faker'

export function generateNewUserData(overide = {}) {
  return {
    userGroupId: null,
    name: faker.datatype.string(60),
    email: faker.datatype.string(100),
    password: faker.datatype.string(20),
    isAdmin: false,
    isSuperUser: false,
    isBlocked: false,
    blockReasonId: null,
    mustChangePasswordNextLogon: false,
    avatar: faker.datatype.string(255),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUserData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    userGroupId: null,
    name: faker.datatype.string(60),
    email: faker.datatype.string(100),
    password: faker.datatype.string(20),
    isAdmin: false,
    isSuperUser: false,
    isBlocked: false,
    blockReasonId: null,
    mustChangePasswordNextLogon: false,
    avatar: faker.datatype.string(255),
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData(overide)
    }
  )
}
