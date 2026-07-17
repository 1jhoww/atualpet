const productAssetModules = import.meta.glob(
  '../assets/products/optimized/**/*.webp',
  { eager: true, query: '?url', import: 'default' },
)

export const getProductAsset = (relativePath) => {
  const asset = productAssetModules[`../assets/products/optimized/${relativePath}`]

  if (!asset) {
    throw new Error(`Imagem de produto não encontrada: ${relativePath}`)
  }

  return asset
}

