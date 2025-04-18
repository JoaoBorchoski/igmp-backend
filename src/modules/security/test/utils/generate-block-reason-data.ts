import { faker } from '@faker-js/faker'

export function generateNewBlockReasonData(overide = {}) {
  return {
    code: faker.datatype.string(3),
    description: faker.datatype.string(60),
    instructionsToSolve: faker.datatype.string(255),
    isSolvedByPasswordReset: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateBlockReasonData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    code: faker.datatype.string(3),
    description: faker.datatype.string(60),
    instructionsToSolve: faker.datatype.string(255),
    isSolvedByPasswordReset: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateBlockReasonsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateBlockReasonData(overide)
    }
  )
}
