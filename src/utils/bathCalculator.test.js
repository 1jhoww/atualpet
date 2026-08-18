import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateBathCosts,
  calculateFinalVolumeMl,
  normalizeVolumeToMl,
  parseBrazilianCurrency,
  parseBrazilianNumber,
} from './bathCalculator.js'

const closeTo = (actual, expected, precision = 1e-10) => {
  assert.ok(Math.abs(actual - expected) < precision, `${actual} deveria ser aproximadamente ${expected}`)
}

test('calcula 750 ml pronto uso sem aumentar o rendimento', () => {
  const result = calculateBathCosts({ price: 75, packageVolumeMl: 750, dilution: 0, usageMl: 150 })
  assert.equal(result.totalParts, 1)
  assert.equal(result.totalDilutedVolumeMl, 750)
  closeTo(result.productCostPerLiter, 100)
  closeTo(result.dilutedCostPerLiter, 100)
  closeTo(result.bathCost, 15)
})

test('calcula embalagem de 5 L com diluição 1:4', () => {
  const result = calculateBathCosts({ price: 300, packageVolumeMl: 5000, dilution: 4, usageMl: 250 })
  assert.equal(result.totalDilutedVolumeMl, 25000)
  closeTo(result.productCostPerMl, 0.06)
  closeTo(result.dilutedCostPerLiter, 12)
  closeTo(result.bathCost, 3)
})

test('calcula embalagem de 1 L com diluição 1:5 e porte médio', () => {
  const result = calculateBathCosts({ price: 90, packageVolumeMl: 1000, dilution: 5, usageMl: 250 })
  assert.equal(result.totalDilutedVolumeMl, 6000)
  closeTo(result.dilutedCostPerMl, 0.015)
  closeTo(result.bathCost, 3.75)
})

test('calcula embalagem de 1 L com diluição 1:12 e porte grande', () => {
  const result = calculateBathCosts({ price: 130, packageVolumeMl: 1000, dilution: 12, usageMl: 500 })
  assert.equal(result.totalDilutedVolumeMl, 13000)
  closeTo(result.dilutedCostPerLiter, 10)
  closeTo(result.bathCost, 5)
})

test('calcula embalagem de 5 L com diluição 1:5', () => {
  const result = calculateBathCosts({ price: 300, packageVolumeMl: 5000, dilution: 5, usageMl: 250 })
  assert.equal(result.totalDilutedVolumeMl, 30000)
  closeTo(result.productCostPerMl, 0.06)
  closeTo(result.bathCost, 2.5)
})

test('normaliza volumes em ml e L, incluindo 3 L personalizados', () => {
  assert.equal(normalizeVolumeToMl(750, 'ml'), 750)
  assert.equal(normalizeVolumeToMl(1, 'l'), 1000)
  assert.equal(normalizeVolumeToMl(3, 'l'), 3000)
  assert.equal(normalizeVolumeToMl(5, 'l'), 5000)
  assert.equal(calculateFinalVolumeMl(normalizeVolumeToMl(3, 'l'), 5), 18000)
})

test('valida consumos pequeno, médio e grande proporcionalmente', () => {
  const base = { price: 120, packageVolumeMl: 1000, dilution: 5 }
  const small = calculateBathCosts({ ...base, usageMl: 150 })
  const medium = calculateBathCosts({ ...base, usageMl: 250 })
  const large = calculateBathCosts({ ...base, usageMl: 500 })
  closeTo(small.bathCost, 3)
  closeTo(medium.bathCost, 5)
  closeTo(large.bathCost, 10)
})

test('interpreta valores monetários e quantidades no formato brasileiro', () => {
  assert.equal(parseBrazilianCurrency('R$ 89,90'), 89.9)
  assert.equal(parseBrazilianCurrency('1.234,56'), 1234.56)
  assert.equal(parseBrazilianCurrency('89.90'), 89.9)
  assert.equal(parseBrazilianNumber('750'), 750)
  assert.equal(parseBrazilianNumber('3,5'), 3.5)
  assert.equal(parseBrazilianNumber('1.000'), 1000)
})

test('rejeita preço, volume, unidade e diluição inválidos', () => {
  assert.ok(Number.isNaN(parseBrazilianCurrency('')))
  assert.ok(Number.isNaN(parseBrazilianNumber('abc')))
  assert.ok(Number.isNaN(normalizeVolumeToMl(0, 'ml')))
  assert.ok(Number.isNaN(normalizeVolumeToMl(-3, 'l')))
  assert.ok(Number.isNaN(normalizeVolumeToMl(3, 'gal')))
  assert.ok(Number.isNaN(calculateFinalVolumeMl(1000, -1)))
  assert.equal(calculateBathCosts({ price: 0, packageVolumeMl: 1000, dilution: 5, usageMl: 150 }), null)
  assert.equal(calculateBathCosts({ price: -10, packageVolumeMl: 1000, dilution: 5, usageMl: 150 }), null)
  assert.equal(calculateBathCosts({ price: 100, packageVolumeMl: Number.NaN, dilution: 5, usageMl: 150 }), null)
})
