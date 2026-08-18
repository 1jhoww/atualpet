export const bathVolumeUnits = [
  { id: 'ml', label: 'ml', multiplier: 1 },
  { id: 'l', label: 'L', multiplier: 1000 },
]

const dreamColorVolumes = [
  { amount: 1, unit: 'l', label: '1 L' },
  { amount: 5, unit: 'l', label: '5 L' },
]

export const bathCalculatorLines = [
  {
    id: 'zoom',
    name: 'Zoom',
    options: [
      {
        id: 'zoom-pronto-uso',
        label: 'Zoom pronto uso',
        dilution: 0,
        dilutionLabel: 'Pronto uso',
        volumePresets: [{ amount: 750, unit: 'ml', label: '750 ml' }],
      },
      {
        id: 'zoom-shampoo-1-4',
        label: 'Shampoo Zoom 1:4',
        dilution: 4,
        dilutionLabel: '1:4',
        volumePresets: [{ amount: 5, unit: 'l', label: '5 L' }],
      },
    ],
  },
  {
    id: 'dream-color',
    name: 'Dream Color',
    options: [
      {
        id: 'dream-color-shampoo-1-5',
        label: 'Shampoo 1:5',
        dilution: 5,
        dilutionLabel: '1:5',
        volumePresets: dreamColorVolumes,
      },
      {
        id: 'dream-color-condicionador-1-5',
        label: 'Condicionador 1:5',
        dilution: 5,
        dilutionLabel: '1:5',
        volumePresets: dreamColorVolumes,
      },
      {
        id: 'dream-color-shampoo-1-12',
        label: 'Shampoo 1:12',
        dilution: 12,
        dilutionLabel: '1:12',
        volumePresets: dreamColorVolumes,
      },
    ],
  },
  {
    id: 'the-luxe',
    name: 'The Luxe',
    options: [
      {
        id: 'the-luxe-shampoo-1-5',
        label: 'Shampoo 1:5',
        dilution: 5,
        dilutionLabel: '1:5',
        volumePresets: [{ amount: 5, unit: 'l', label: '5 L' }],
      },
      {
        id: 'the-luxe-condicionador-1-5',
        label: 'Condicionador 1:5',
        dilution: 5,
        dilutionLabel: '1:5',
        volumePresets: [{ amount: 5, unit: 'l', label: '5 L' }],
      },
    ],
  },
]

export const bathAnimalSizes = [
  { id: 'small', name: 'Pequeno', usageMl: 150 },
  { id: 'medium', name: 'Médio', usageMl: 250 },
  { id: 'large', name: 'Grande', usageMl: 500 },
]

export const getBathCalculatorLine = (lineId) => bathCalculatorLines.find((line) => line.id === lineId)

export const getBathCalculatorOption = (lineId, optionId) => (
  getBathCalculatorLine(lineId)?.options.find((option) => option.id === optionId)
)

export const getBathAnimalSize = (sizeId) => bathAnimalSizes.find((size) => size.id === sizeId)

export const getBathVolumeUnit = (unitId) => bathVolumeUnits.find((unit) => unit.id === unitId)
