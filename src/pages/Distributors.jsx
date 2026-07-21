import { MapPin, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Seo from '../components/Seo'
import { distributors } from '../data/distributors'
import { catalogService } from '../services/catalogService'
import styles from './Distributors.module.css'

const stateNames = {
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MG: 'Minas Gerais',
  MS: 'Mato Grosso do Sul',
  PE: 'Pernambuco',
  PR: 'Paraná',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RO: 'Rondônia',
  RS: 'Rio Grande do Sul',
  SC: 'Santa Catarina',
  SE: 'Sergipe',
  SP: 'São Paulo',
}

const compareText = (first, second) => first.localeCompare(second, 'pt-BR')

const groupByState = (items) => Object.entries(items.reduce((groups, item) => {
  groups[item.state] = [...(groups[item.state] || []), item]
  return groups
}, {}))
  .map(([state, partners]) => ({
    state,
    name: stateNames[state] || state,
    partners: partners.sort((first, second) => (
      compareText(first.city, second.city) || compareText(first.name, second.name)
    )),
  }))
  .sort((first, second) => compareText(first.name, second.name))

export default function Distributors() {
  const [filters, setFilters] = useState({ search: '', state: '', region: '' })
  const results = useMemo(() => catalogService.searchDistributors(filters), [filters])
  const groupedResults = useMemo(() => groupByState(results), [results])
  const states = useMemo(() => [...new Set(distributors.map((item) => item.state))]
    .sort((first, second) => compareText(stateNames[first], stateNames[second])), [])
  const regions = useMemo(() => [...new Set(distributors.map((item) => item.region))].sort(compareText), [])
  const set = (key, value) => setFilters((current) => ({ ...current, [key]: value }))

  return <>
    <Seo
      title="Onde encontrar Atual Pet"
      description="Localize distribuidores e parceiros comerciais da Atual Pet em diferentes estados brasileiros."
      path="/onde-encontrar"
    />

    <header className={styles.intro}>
      <div className="shell">
        <span className="eyebrow">Rede de parceiros</span>
        <h1>Onde encontrar Atual Pet</h1>
        <p>A Atual Pet está presente em diversas regiões do Brasil através de distribuidores e parceiros comerciais especializados.</p>
        <strong className={styles.networkCount}>
          <MapPin size={18} aria-hidden="true" />
          {distributors.length} distribuidores e parceiros comerciais em diversos estados brasileiros.
        </strong>
      </div>
    </header>

    <main className={`${styles.page} shell section`}>
      <section className={styles.filters} aria-labelledby="partner-search-title">
        <header>
          <div>
            <span className="eyebrow">Busca regional</span>
            <h2 id="partner-search-title">Encontre um parceiro.</h2>
          </div>
          <p aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'parceiro encontrado' : 'parceiros encontrados'}</p>
        </header>
        <div className={styles.filterGrid}>
          <label className={styles.search}>
            Nome ou cidade
            <span><Search size={17} aria-hidden="true" /><input value={filters.search} onChange={(event) => set('search', event.target.value)} placeholder="Ex.: São Paulo" /></span>
          </label>
          <label>
            Estado
            <select value={filters.state} onChange={(event) => set('state', event.target.value)}>
              <option value="">Todos</option>
              {states.map((state) => <option key={state} value={state}>{stateNames[state]} ({state})</option>)}
            </select>
          </label>
          <label>
            Região
            <select value={filters.region} onChange={(event) => set('region', event.target.value)}>
              <option value="">Todas</option>
              {regions.map((region) => <option key={region}>{region}</option>)}
            </select>
          </label>
          <button type="button" className="text-link" onClick={() => setFilters({ search: '', state: '', region: '' })}>Limpar filtros</button>
        </div>
      </section>

      {groupedResults.length
        ? <div className={styles.stateGrid}>
          {groupedResults.map((group) => <section
            className={styles.stateGroup}
            data-size={group.partners.length > 8 ? 'large' : undefined}
            key={group.state}
            aria-labelledby={`state-${group.state}`}
          >
            <header>
              <h2 id={`state-${group.state}`}>{group.name} <span>({group.state})</span></h2>
              <small>{group.partners.length} {group.partners.length === 1 ? 'parceiro' : 'parceiros'}</small>
            </header>
            <div className={styles.partnerList}>
              {group.partners.map((partner) => <article className={styles.partner} key={partner.id}>
                <MapPin size={18} aria-hidden="true" />
                <div>
                  <h3>{partner.name}</h3>
                  <p>{partner.city} · {partner.state}</p>
                </div>
              </article>)}
            </div>
          </section>)}
        </div>
        : <EmptyState title="Nenhum parceiro localizado" text="Tente outra cidade ou remova um dos filtros." />}
    </main>

    <section className={`${styles.cta} shell`} aria-labelledby="distribution-cta-title">
      <div>
        <span className="eyebrow">Amplie nossa presença</span>
        <h2 id="distribution-cta-title">Não encontrou um distribuidor na sua região?</h2>
      </div>
      <Link className="button" to="/seja-um-distribuidor">Seja um distribuidor</Link>
    </section>
  </>
}
