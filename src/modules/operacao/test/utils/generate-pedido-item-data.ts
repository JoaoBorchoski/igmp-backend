import { faker } from '@faker-js/faker'

export function generateNewPedidoItemData(overide = {}) {
  return {
    pedidoId: null,
    produto: faker.datatype.string(256),
    corEtiqueta: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePedidoItemData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    pedidoId: null,
    produto: faker.datatype.string(256),
    corEtiqueta: faker.datatype.string(255),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePedidosItemsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePedidoItemData(overide)
    }
  )
}
