export const parseBrazilianNumber = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : Number.NaN
  if (typeof value !== 'string') return Number.NaN

  const compact = value.trim().replace(/\s/g, '')
  if (!compact || !/^-?[\d.,]+$/.test(compact)) return Number.NaN

  const commaIndex = compact.lastIndexOf(',')
  const dotMatches = compact.match(/\./g) || []
  let normalized

  if (commaIndex >= 0) {
    normalized = compact.replace(/\./g, '').replace(',', '.')
  } else if (dotMatches.length === 1 && compact.length - compact.lastIndexOf('.') - 1 <= 2) {
    normalized = compact
  } else {
    normalized = compact.replace(/\./g, '')
  }

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

export const parseBrazilianCurrency = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : Number.NaN
  if (typeof value !== 'string') return Number.NaN
  return parseBrazilianNumber(value.replace(/R\$/gi, ''))
}

export const normalizeVolumeToMl = (amount, unit) => {
  if (!Number.isFinite(amount) || amount <= 0) return Number.NaN
  if (unit === 'ml') return amount
  if (unit === 'l') return amount * 1000
  return Number.NaN
}

export const calculateFinalVolumeMl = (packageVolumeMl, dilution) => {
  if (!Number.isFinite(packageVolumeMl) || packageVolumeMl <= 0) return Number.NaN
  if (!Number.isFinite(dilution) || dilution < 0) return Number.NaN
  return packageVolumeMl * (dilution + 1)
}

export const calculateBathCosts = ({ price, packageVolumeMl, dilution, usageMl }) => {
  const values = [price, packageVolumeMl, dilution, usageMl]
  if (values.some((value) => !Number.isFinite(value))) return null
  if (price <= 0 || packageVolumeMl <= 0 || dilution < 0 || usageMl <= 0) return null

  const totalParts = dilution + 1
  const productCostPerMl = price / packageVolumeMl
  const totalDilutedVolumeMl = calculateFinalVolumeMl(packageVolumeMl, dilution)
  const dilutedCostPerMl = price / totalDilutedVolumeMl

  return {
    totalParts,
    productCostPerLiter: productCostPerMl * 1000,
    productCostPerMl,
    concentrateCostPerLiter: productCostPerMl * 1000,
    concentrateCostPerMl: productCostPerMl,
    totalDilutedVolumeMl,
    dilutedCostPerLiter: dilutedCostPerMl * 1000,
    dilutedCostPerMl,
    bathCost: dilutedCostPerMl * usageMl,
  }
}

export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(value)
