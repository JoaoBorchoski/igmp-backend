import { faker } from '@faker-js/faker'

export function generateNewCadastroObraData(overide = {}) {
  return {
    nome: faker.datatype.string(100),
    cnpj: faker.datatype.string(14),
    endereco: faker.datatype.string(255),
    responsavelObra: faker.datatype.string(100),
    contato: faker.datatype.string(20),
    previsaoEntrega: new Date(),
    tipoObra: faker.datatype.string(10),
    plantasIguais: false,
    qtdCasas: faker.datatype.number({ max: 9 }),
    grupoCasas: faker.datatype.string(50),
    estruturaPredio: faker.datatype.string(10),
    qtdAptoPorAndar: faker.datatype.number({ max: 9 }),
    andares: faker.datatype.number({ max: 9 }),
    qtdAptos: faker.datatype.number({ max: 9 }),
    grupoAndares: faker.datatype.string(50),
    padraoCorId: null,
    solidaMadeirada: faker.datatype.string(10),
    coresTiposId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCadastroObraData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    nome: faker.datatype.string(100),
    cnpj: faker.datatype.string(14),
    endereco: faker.datatype.string(255),
    responsavelObra: faker.datatype.string(100),
    contato: faker.datatype.string(20),
    previsaoEntrega: new Date(),
    tipoObra: faker.datatype.string(10),
    plantasIguais: false,
    qtdCasas: faker.datatype.number({ max: 9 }),
    grupoCasas: faker.datatype.string(50),
    estruturaPredio: faker.datatype.string(10),
    qtdAptoPorAndar: faker.datatype.number({ max: 9 }),
    andares: faker.datatype.number({ max: 9 }),
    qtdAptos: faker.datatype.number({ max: 9 }),
    grupoAndares: faker.datatype.string(50),
    padraoCorId: null,
    solidaMadeirada: faker.datatype.string(10),
    coresTiposId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCadastroObrasData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCadastroObraData(overide)
    }
  )
}
