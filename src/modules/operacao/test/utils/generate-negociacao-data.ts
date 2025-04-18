import { faker } from '@faker-js/faker'

export function generateNewNegociacaoData(overide = {}) {
  return {
    medicaoId: null,
    clienteId: null,
    statusNegociacaoId: null,
    funcionarioId: null,
    dataCriacao: new Date(),
    dataFechamento: new Date(),
    descricao: faker.datatype.string(255),
    motivoPerda: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateNegociacaoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    medicaoId: null,
    clienteId: null,
    statusNegociacaoId: null,
    funcionarioId: null,
    dataCriacao: new Date(),
    dataFechamento: new Date(),
    descricao: faker.datatype.string(255),
    motivoPerda: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateNegociacoesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateNegociacaoData(overide)
    }
  )
}
