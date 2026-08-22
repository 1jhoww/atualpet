import { MapPin, Phone, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import brazilMap from '../assets/maps/brazil-states-map.json'
import BrazilMap from '../components/BrazilMap'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { company } from '../data/company'
import { distributors } from '../data/distributors'
import {
  countCoverageByState,
  getCoverageSearchText,
  getServedStates,
  listCoveredStates,
  normalizeStateCode,
  servesState,
} from '../utils/distributorCoverage'
import styles from './Distributors.module.css'

const stateNames = Object.fromEntries(brazilMap.states.map(({ uf, name }) => [uf, name]))
const allStates = brazilMap.states.map(({ uf }) => uf).sort()
const coveredStates = listCoveredStates(distributors)
const coverageCounts = countCoverageByState(distributors)
const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const groupByState = (items) => Object.entries(items.reduce((groups, item) => {
  groups[item.state] = [...(groups[item.state] || []), item]
  return groups
}, {}))
  .map(([state, partners]) => ({
    state,
    name: stateNames[state] || state,
    partners,
  }))
  .sort((first, second) => first.state.localeCompare(second.state, 'pt-BR'))

const distributorLabel = (count) => `${count} ${count === 1 ? 'distribuidor' : 'distribuidores'}`
const getCoverage = (partner) => [...(partner.serviceCities || []), ...(partner.serviceAreas || [])]
const getWhatsapps = (partner) => [partner.whatsapp, ...(partner.additionalWhatsapps || [])].filter(Boolean)
const getPhones = (partner) => [partner.phone].filter(Boolean)
const whatsappMessage = 'Olá! Vim pelo site da Atual Pet e gostaria de receber mais informações sobre os produtos.'
const encodedWhatsappMessage = encodeURIComponent(whatsappMessage)
const normalizeWhatsapp = (value = '') => {
  const digits = value.replace(/\D/g, '')
  return digits.startsWith('55') && [12, 13].includes(digits.length) ? digits : `55${digits}`
}
const getWhatsappUrl = (value) => `https://wa.me/${normalizeWhatsapp(value)}?text=${encodedWhatsappMessage}`
const matchesDistributorSearch = (partner, search) => {
  if (!search) return true
  const searchedState = normalizeStateCode(search)
  if (searchedState) return servesState(partner, searchedState)
  const haystack = normalize(`${partner.name} ${partner.contactName || ''} ${partner.city} ${getCoverage(partner).join(' ')} ${getCoverageSearchText(partner)}`)
  return haystack.includes(normalize(search))
}
const formatPhone = (value) => {
  const normalizedNumber = normalizeWhatsapp(value)
  const localNumber = normalizedNumber.slice(2)
  if (localNumber.length === 11) return `(${localNumber.slice(0, 2)}) ${localNumber.slice(2, 7)}-${localNumber.slice(7)}`
  if (localNumber.length === 10) return `(${localNumber.slice(0, 2)}) ${localNumber.slice(2, 6)}-${localNumber.slice(6)}`
  return `+${normalizedNumber}`
}

const getResultsScrollMode = ({ key, value, source }) => {
  if (source !== 'primary') return 'none'
  if (key === 'state') return value ? 'immediate' : 'none'
  if (key === 'search') return value.trim() ? 'debounced' : 'none'
  return 'none'
}

export default function Distributors() {
  const [filters, setFilters] = useState({ search: '', state: '' })
  const [resultsScrollRequest, setResultsScrollRequest] = useState(0)
  const [hoveredPartnerId, setHoveredPartnerId] = useState('')
  const [focusedPartnerId, setFocusedPartnerId] = useState('')
  const [pinnedPartnerId, setPinnedPartnerId] = useState('')
  const resultsSectionRef = useRef(null)
  const searchScrollTimerRef = useRef(null)
  const activePartnerId = focusedPartnerId || hoveredPartnerId || pinnedPartnerId
  const activePartner = distributors.find((partner) => partner.id === activePartnerId)
  const mapCandidates = useMemo(
    () => distributors.filter((item) => matchesDistributorSearch(item, filters.search)),
    [filters.search],
  )
  const results = useMemo(
    () => mapCandidates.filter((item) => !filters.state || servesState(item, filters.state)),
    [filters.state, mapCandidates],
  )
  const stateCounts = useMemo(() => countCoverageByState(mapCandidates), [mapCandidates])
  const groupedResults = useMemo(() => groupByState(results), [results])
  const hasFilters = Boolean(filters.search || filters.state)
  const showAdministrativeContact = Boolean(filters.state && !coverageCounts[filters.state])
  const resultLabel = `${results.length} ${results.length === 1 ? 'distribuidor encontrado' : 'distribuidores encontrados'}`
  const searchValue = filters.search.trim()
  const resultContext = [
    filters.state ? `em ${stateNames[filters.state]}` : '',
    searchValue ? `para “${searchValue}”` : '',
  ].filter(Boolean).join(' ')
  const resultsHeading = `${resultLabel}${resultContext ? ` ${resultContext}` : ''}`

  useEffect(() => {
    if (!resultsScrollRequest) return

    const frame = window.requestAnimationFrame(() => {
      const resultsElement = resultsSectionRef.current
      if (!resultsElement) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      resultsElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [resultsScrollRequest])

  useEffect(() => () => window.clearTimeout(searchScrollTimerRef.current), [])

  const clearPartnerHighlight = () => {
    setHoveredPartnerId('')
    setFocusedPartnerId('')
    setPinnedPartnerId('')
  }

  const queueResultsScroll = (mode) => {
    window.clearTimeout(searchScrollTimerRef.current)
    if (mode === 'debounced') {
      searchScrollTimerRef.current = window.setTimeout(() => {
        setResultsScrollRequest((current) => current + 1)
      }, 250)
      return
    }
    if (mode === 'immediate') setResultsScrollRequest((current) => current + 1)
  }

  const updateFilter = (key, value, source = 'primary') => {
    setFilters((current) => ({ ...current, [key]: value }))
    clearPartnerHighlight()
    queueResultsScroll(getResultsScrollMode({ key, value, source }))
  }

  const clearFilters = () => {
    setFilters({ search: '', state: '' })
    clearPartnerHighlight()
    queueResultsScroll('none')
  }

  const toggleState = (state) => updateFilter('state', filters.state === state ? '' : state)

  const handleMapToggleState = (state) => toggleState(state)

  const togglePartner = (partnerId) => {
    setPinnedPartnerId((current) => current === partnerId ? '' : partnerId)
  }

  const scrollToResults = () => {
    const resultsElement = document.getElementById('distributor-results')
    if (!resultsElement) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resultsElement.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    resultsElement.focus({ preventScroll: true })
  }

  const summary = activePartner
    ? {
      eyebrow: 'Distribuidor em destaque',
      title: activePartner.name,
      text: `${activePartner.city} · ${stateNames[activePartner.state]} (${activePartner.state}).${filters.state && activePartner.state !== filters.state ? ` Atende ${stateNames[filters.state]} sem possuir sede local.` : ' O estado da sede está realçado no mapa sem alterar os filtros.'}`,
    }
    : filters.state && showAdministrativeContact
      ? {
        eyebrow: 'Atendimento administrativo',
        title: stateNames[filters.state],
        text: 'Ainda não há distribuidor cadastrado neste estado. Nossa equipe administrativa pode direcionar o atendimento.',
      }
      : filters.state
      ? {
        eyebrow: 'Estado selecionado',
        title: stateNames[filters.state],
        text: `${distributorLabel(stateCounts[filters.state] || 0)} com cobertura no estado.`,
      }
      : {
        eyebrow: 'Rede Atual Pet',
        title: 'Selecione um estado no mapa',
        text: `A rede possui cobertura comercial em ${coveredStates.length} estados por meio de ${distributors.length} distribuidores oficiais.`,
      }

  return <>
    <Seo
      title="Onde encontrar Atual Pet"
      description="Localize distribuidores e parceiros comerciais da Atual Pet em diferentes estados brasileiros."
      path="/onde-encontrar"
    />

    <header className={styles.hero}>
      <Reveal className={`${styles.heroLayout} shell`}>
        <span className="eyebrow">Onde encontrar</span>
        <div className={styles.heroTitle}>
          <h1>Encontre a Atual Pet perto de você.</h1>
        </div>
        <div className={styles.heroCopy}>
          <p>Conheça os distribuidores oficiais da Atual Pet em diferentes regiões do Brasil.</p>
          <strong>{distributors.length} distribuidores em {coveredStates.length} estados</strong>
        </div>
      </Reveal>
    </header>

    <Reveal as="section" className={`${styles.presence} shell`} aria-label="Resumo da presença nacional">
      <dl>
        <div>
          <dt>Distribuidores oficiais</dt>
          <dd>{distributors.length}</dd>
        </div>
        <div>
          <dt>Estados atendidos</dt>
          <dd>{coveredStates.length}</dd>
        </div>
        <div>
          <dt>Presença nacional</dt>
          <dd>Brasil</dd>
        </div>
      </dl>
    </Reveal>

    <main className={styles.page}>
      <div className="shell">
        <section className={styles.locator} aria-labelledby="partner-search-title">
          <header className={styles.locatorHeader}>
            <span className="eyebrow">Busca regional</span>
            <h2 id="partner-search-title">Encontre um distribuidor na sua região.</h2>
            <p>Pesquise por cidade, estado ou distribuidor, ou explore a cobertura pelo mapa.</p>
          </header>

          <form className={styles.filterForm} role="search" onSubmit={(event) => event.preventDefault()}>
            <div className={`${styles.field} ${styles.primarySearch}`}>
              <label htmlFor="distributor-search">Distribuidor, cidade ou estado</label>
              <p id="distributor-search-help" className={styles.searchHelp}>Digite sua cidade para encontrar quem atende sua região.</p>
              <div className={styles.searchField}>
                <Search size={20} aria-hidden="true" />
                <input
                  id="distributor-search"
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter('search', event.target.value)}
                  placeholder="Ex.: Cotia, SP ou PetMais"
                  autoComplete="off"
                  aria-describedby="distributor-search-help"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="distributor-state">Estado</label>
              <select id="distributor-state" value={filters.state} onChange={(event) => updateFilter('state', event.target.value)}>
                <option value="">Todos os estados</option>
                {allStates.map((state) => <option key={state} value={state}>{state} — {stateNames[state]}</option>)}
              </select>
            </div>

            <div className={styles.filterStatus}>
              <p aria-live="polite" aria-atomic="true">{resultLabel}</p>
              <button type="button" className="text-link" onClick={clearFilters} disabled={!hasFilters}>Limpar filtros</button>
            </div>
          </form>

          <Reveal className={styles.mapArea} data-reveal="image">
            <BrazilMap
              counts={stateCounts}
              selectedState={filters.state}
              highlightedState={activePartner?.state || ''}
              onToggleState={handleMapToggleState}
            />
          </Reveal>

          <div className={styles.stateSummary} aria-live="polite" aria-atomic="true">
            <span>{summary.eyebrow}</span>
            <strong>{summary.title}</strong>
            <p>{summary.text}</p>
            {filters.state && <button type="button" className={styles.resultsJump} onClick={scrollToResults}>
              Ver distribuidores de {filters.state}
            </button>}
          </div>

          <nav className={styles.stateNav} aria-label="Navegação rápida por estado">
            <span>Atalhos por UF</span>
            <div>
              {allStates.map((state) => <button
                type="button"
                key={state}
                className={`${filters.state === state ? styles.stateActive : ''} ${!coverageCounts[state] ? styles.stateUnavailable : ''}`}
                aria-pressed={filters.state === state}
                aria-label={`${filters.state === state ? 'Remover filtro' : 'Filtrar'} por ${stateNames[state]}`}
                onClick={() => toggleState(state)}
              >{state}</button>)}
            </div>
          </nav>
        </section>

        <section
          className={styles.resultsArea}
          id="distributor-results"
          ref={resultsSectionRef}
          tabIndex="-1"
          aria-labelledby="distributor-results-title"
        >
          <header className={styles.resultsToolbar}>
            <div className={styles.resultsSummary}>
              <span>Resultados</span>
              <h2 id="distributor-results-title">{resultsHeading}</h2>
            </div>

            <div className={styles.contextSearch}>
              <label htmlFor="distributor-results-search">Pesquisar nestes resultados</label>
              <div className={styles.contextSearchField}>
                <Search size={17} aria-hidden="true" />
                <input
                  id="distributor-results-search"
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter('search', event.target.value, 'results')}
                  placeholder="Ex.: Teresina ou PetMais"
                  autoComplete="off"
                />
              </div>
            </div>
          </header>

          {groupedResults.length
            ? <div className={styles.stateList}>
              {groupedResults.map((group, groupIndex) => <Reveal
                as="section"
                className={`${styles.stateGroup} ${filters.state === group.state ? styles.filteredGroup : ''}`}
                key={group.state}
                delay={Math.min(groupIndex * 35, 210)}
                data-state-group={group.state}
                style={{ scrollMarginTop: '112px' }}
                aria-labelledby={`state-${group.state}`}
              >
                <header className={styles.stateHeader}>
                  <h2 id={`state-${group.state}`}><span>{group.state}</span>{group.name}</h2>
                  <p>{distributorLabel(group.partners.length)}</p>
                </header>

                <div className={styles.partnerGrid}>
                  {group.partners.map((partner) => {
                    const isActive = activePartnerId === partner.id
                    const isPinned = pinnedPartnerId === partner.id
                    const coverage = getCoverage(partner)
                    const whatsapps = getWhatsapps(partner)
                    const phones = getPhones(partner)
                    const servedStates = getServedStates(partner)
                    const coverageLabel = filters.state && partner.state !== filters.state
                      ? `Atende ${stateNames[filters.state]}`
                      : servedStates.length > 1
                        ? `Cobertura: ${servedStates.join(', ')}`
                        : ''
                    return <article
                      className={`${styles.partner} ${isActive ? styles.partnerActive : ''}`}
                      key={partner.id}
                      onPointerEnter={() => setHoveredPartnerId(partner.id)}
                      onPointerLeave={() => setHoveredPartnerId('')}
                    >
                      <button
                        type="button"
                        className={styles.partnerMain}
                        aria-pressed={isPinned}
                        aria-label={`${partner.name}, ${partner.city}, ${stateNames[partner.state]}. Destacar ${partner.state} no mapa.`}
                        onFocus={() => setFocusedPartnerId(partner.id)}
                        onBlur={() => setFocusedPartnerId('')}
                        onClick={() => togglePartner(partner.id)}
                      >
                        <span className={styles.partnerName}>{partner.name}</span>
                        {partner.contactName && <span className={styles.contactName}>Contato comercial: {partner.contactName}</span>}
                        <span className={styles.partnerLocation}><MapPin size={15} aria-hidden="true" />{partner.city} · {partner.state}</span>
                        {coverageLabel && <span className={styles.coverageStates}>{coverageLabel}</span>}
                      </button>

                      {coverage.length > 0 && <details className={styles.coverage}>
                        <summary>Área atendida <span>ver detalhes</span></summary>
                        <p>{coverage.join(' · ')}</p>
                      </details>}

                      {(phones.length > 0 || whatsapps.length > 0) && <div className={styles.contacts} aria-label={`Contatos de ${partner.name}`}>
                        {phones.map((phone) => <a
                          key={phone}
                          href={`tel:+${phone.replace(/\D/g, '')}`}
                          aria-label={`Ligar para ${partner.name}: ${formatPhone(phone)}`}
                          onFocus={() => setFocusedPartnerId(partner.id)}
                          onBlur={() => setFocusedPartnerId('')}
                        >
                          <Phone size={14} aria-hidden="true" />
                          <span>Telefone</span>
                          <strong>{formatPhone(phone)}</strong>
                        </a>)}
                        {whatsapps.map((whatsapp, index) => <a
                          key={whatsapp}
                          href={getWhatsappUrl(whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir WhatsApp ${index + 1} de ${partner.name}: ${formatPhone(whatsapp)}`}
                          onFocus={() => setFocusedPartnerId(partner.id)}
                          onBlur={() => setFocusedPartnerId('')}
                        >
                          <Phone size={14} aria-hidden="true" />
                          <span>{index === 0 ? 'WhatsApp' : `WhatsApp ${index + 1}`}</span>
                          <strong>{formatPhone(whatsapp)}</strong>
                        </a>)}
                      </div>}
                    </article>
                  })}
                </div>
              </Reveal>)}
            </div>
            : showAdministrativeContact
              ? <div className={styles.stateList}>
                <section className={`${styles.stateGroup} ${styles.filteredGroup}`} data-state-group={filters.state} aria-labelledby={`state-${filters.state}`}>
                  <header className={styles.stateHeader}>
                    <h2 id={`state-${filters.state}`}><span>{filters.state}</span>{stateNames[filters.state]}</h2>
                    <p>Atendimento administrativo</p>
                  </header>
                  <div className={styles.partnerGrid}>
                    <article className={`${styles.partner} ${styles.administrativePartner}`}>
                      <div className={`${styles.partnerMain} ${styles.administrativeMain}`}>
                        <span className={styles.partnerName}>Atendimento administrativo Atual Pet</span>
                        <p className={styles.administrativeMessage}>Ainda não possuímos um distribuidor nesta região. Entre em contato com nosso setor administrativo para que possamos direcionar seu atendimento.</p>
                        <span className={styles.partnerLocation}><MapPin size={15} aria-hidden="true" />{stateNames[filters.state]} · {filters.state}</span>
                      </div>
                      <div className={styles.contacts} aria-label="Contato administrativo da Atual Pet">
                        <a href={getWhatsappUrl(company.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={`Abrir WhatsApp administrativo da Atual Pet: ${formatPhone(company.whatsapp)}`}>
                          <Phone size={14} aria-hidden="true" />
                          <span>WhatsApp</span>
                          <strong>{formatPhone(company.whatsapp)}</strong>
                        </a>
                      </div>
                    </article>
                  </div>
                </section>
              </div>
              : <section className={styles.emptyState} aria-labelledby="empty-distributors-title">
                <h2 id="empty-distributors-title">Nenhum distribuidor encontrado.</h2>
                <p>Tente buscar por outro nome ou selecione um estado diferente.</p>
                <button type="button" className="button button--outline" onClick={clearFilters}>Limpar filtros</button>
              </section>}
        </section>
      </div>
    </main>

    <section className={styles.cta} aria-labelledby="distribution-cta-title">
      <Reveal className={`${styles.ctaInner} shell`}>
        <span className="eyebrow">Amplie nossa presença</span>
        <h2 id="distribution-cta-title">Quer representar a Atual Pet na sua região?</h2>
        <p>Entre em contato e conheça as possibilidades para se tornar um distribuidor.</p>
        <Link className="button" to="/seja-um-distribuidor">Seja um distribuidor</Link>
      </Reveal>
    </section>
  </>
}
