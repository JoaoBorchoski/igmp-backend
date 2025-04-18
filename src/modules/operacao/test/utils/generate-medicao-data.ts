import { faker } from '@faker-js/faker'

export function generateNewMedicaoData(overide = {}) {
  return {
    obraId: null,
    complemento: faker.datatype.string(255),
    espessuraParede: faker.datatype.string(50),
    larguraVaosId: null,
    alturaVaosId: null,
    tipoEnchimentoId: null,
    tipoPortaId: null,
    confirmacao: false,
    complementoOrigemId: null,
    sentidoAberturaId: null,
    alizarId: null,
    fechaduraId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMedicaoData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    obraId: null,
    complemento: faker.datatype.string(255),
    espessuraParede: faker.datatype.string(50),
    larguraVaosId: null,
    alturaVaosId: null,
    tipoEnchimentoId: null,
    tipoPortaId: null,
    confirmacao: false,
    complementoOrigemId: null,
    sentidoAberturaId: null,
    alizarId: null,
    fechaduraId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateMedicoesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateMedicaoData(overide)
    }
  )
}
