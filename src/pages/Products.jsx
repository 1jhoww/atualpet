import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import ProductLineNav from '../components/ProductLineNav'
import ProductLineOverview from '../components/ProductLineOverview'
import Seo from '../components/Seo'
import { products } from '../data/products'
import { dilutionValues, getProductLine, productCategories, productLines, publicVolumeFilter } from '../data/productTaxonomy'
import { catalogService } from '../services/catalogService'
import styles from './Products.module.css'

const queryKeys = {
  search: 'busca',
  launch: 'lancamento',
  line: 'linha',
  category: 'categoria',
  fragrance: 'fragrancia',
  volume: 'volume',
  dilution: 'diluicao',
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [limit, setLimit] = useState(8)
  const [mobileOpen, setMobileOpen] = useState(false)
  const overviewRef = useRef(null)
  const activeProducts = products.filter((product) => product.active)
  const hasLaunches = activeProducts.some((product) => product.isLaunch)
  const filters = {
    search: params.get('busca') || '',
    launch: params.get('lancamento') === 'true',
    line: params.get('linha') || '',
    category: params.get('categoria') || '',
    fragrance: params.get('fragrancia') || '',
    volume: params.get('volume') || '',
    dilution: params.get('diluicao') || '',
  }

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    next.delete('ordem')
    value ? next.set(queryKeys[key], value) : next.delete(queryKeys[key])
    setParams(next)
    setLimit(8)
  }

  const unique = (field) => [...new Set(activeProducts
    .flatMap((product) => Array.isArray(product[field]) ? product[field] : product[field])
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))

  const activeLineIds = new Set(activeProducts.map((product) => product.line))
  const activeCategoryIds = new Set(activeProducts.map((product) => product.category))
  const lineOptions = productLines.filter((line) => activeLineIds.has(line.id))
  const categoryOptions = productCategories.filter((category) => activeCategoryIds.has(category.id))
  const volumeOptions = publicVolumeFilter.filter((volume) => activeProducts.some((product) => product.volumes.includes(volume)))
  const dilutionOptions = dilutionValues.filter((dilution) => activeProducts.some((product) => product.dilutions.includes(dilution)))

  const selectLine = (line) => {
    setFilter('line', line)
    window.requestAnimationFrame(() => overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const select = (label, key, options) => <label>
    {label}
    <select value={filters[key]} onChange={(event) => setFilter(key, event.target.value)}>
      <option value="">Todos</option>
      {options.map((option) => {
        const value = typeof option === 'string' ? option : option.id
        const name = typeof option === 'string' ? option : option.name
        return <option key={value} value={value}>{name}</option>
      })}
    </select>
  </label>

  const results = catalogService.searchProducts(filters)
  const selectedLine = getProductLine(filters.line)
  const selectedCommercialLine = selectedLine?.supportMaterial ? null : selectedLine
  const hasAdditionalFilters = Boolean(
    filters.search
    || filters.launch
    || filters.category
    || filters.fragrance
    || filters.volume
    || filters.dilution,
  )

  return <>
    <Seo title="Catálogo de produtos" description="Explore o catálogo público Atual Pet por linha, categoria, fragrância, volume e diluição." path="/produtos" />
    <PageHero eyebrow="Catálogo profissional" title="Encontre o produto certo para cada etapa." text="Consulte linhas, categorias e apresentações. O catálogo não exibe preços nem realiza vendas online." />
    <ProductLineNav products={activeProducts} activeLine={filters.line} onSelect={selectLine} />
    <ProductLineOverview
      ref={overviewRef}
      line={selectedCommercialLine}
      products={activeProducts}
      visibleCount={results.length}
      hasAdditionalFilters={hasAdditionalFilters}
    />
    <main className={`${styles.catalog} shell section`}>
      <button className={styles.filterToggle} onClick={() => setMobileOpen(true)}><SlidersHorizontal size={18} /> Filtros</button>
      <aside className={`${styles.filters} ${mobileOpen ? styles.open : ''}`} aria-label="Filtros do catálogo">
        <div className={styles.filterTop}><h2>Filtros</h2><button onClick={() => setMobileOpen(false)}>Fechar</button></div>
        <label className={styles.search}>Buscar<Search size={17} /><input value={filters.search} onChange={(event) => setFilter('search', event.target.value)} placeholder="Nome, fragrância ou apresentação" /></label>
        {hasLaunches && <label>Lançamentos<select value={filters.launch ? 'true' : ''} onChange={(event) => setFilter('launch', event.target.value)}><option value="">Todos</option><option value="true">Somente lançamentos</option></select></label>}
        {select('Linha', 'line', lineOptions)}
        {select('Categoria', 'category', categoryOptions)}
        {select('Fragrância', 'fragrance', unique('fragrance'))}
        {select('Volume', 'volume', volumeOptions)}
        {select('Diluição', 'dilution', dilutionOptions)}
        <button className="text-link" onClick={() => { setParams({}); setMobileOpen(false) }}><RotateCcw size={15} /> Limpar filtros</button>
      </aside>
      <section className={styles.results}>
        <div className={styles.resultTop}>
          <p><strong>{results.length}</strong> {results.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p>
          <span>Organizado por linha</span>
        </div>
        {results.length ? <>
          <div className="product-grid product-grid--catalog">{results.slice(0, limit).map((product) => <ProductCard key={product.id} product={product} />)}</div>
          {limit < results.length && <div className="section-action"><button className="button button--outline" onClick={() => setLimit(limit + 8)}>Carregar mais</button></div>}
        </> : <EmptyState />}
      </section>
    </main>
  </>
}
