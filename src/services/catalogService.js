import { products } from '../data/products'
import { distributors } from '../data/distributors'

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const catalogService = {
  listProducts: () => Promise.resolve(products.filter((item) => item.active)),
  searchProducts: (filters) => products.filter((item) => {
    const haystack = normalize(`${item.name} ${item.short} ${item.description} ${item.fragrance} ${item.volumes.join(' ')} ${item.dilutions.join(' ')}`)
    return item.active
      && (!filters.search || haystack.includes(normalize(filters.search)))
      && (!filters.launch || item.isLaunch)
      && (!filters.line || item.line === filters.line)
      && (!filters.category || item.category === filters.category)
      && (!filters.fragrance || item.fragrance === filters.fragrance)
      && (!filters.volume || item.volumes.includes(filters.volume))
      && (!filters.dilution || item.dilutions.includes(filters.dilution))
  }),
  searchDistributors: ({ search = '', state = '', region = '' }) => distributors.filter((item) => (
    (!search || normalize(`${item.name} ${item.city}`).includes(normalize(search)))
    && (!state || item.state === state)
    && (!region || item.region === region)
  )),
}
