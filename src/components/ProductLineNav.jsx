import { ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { productLines } from '../data/productTaxonomy'
import styles from './ProductLineNav.module.css'

export default function ProductLineNav({ products, activeLine, onSelect, compact = false }) {
  const commercialLines = productLines.filter((line) => !line.supportMaterial)
  const railRef = useRef(null)
  const [hasMoreLines, setHasMoreLines] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined

    const updateOverflowIndicator = () => {
      const hasHiddenContent = rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4
      setHasMoreLines((current) => current === hasHiddenContent ? current : hasHiddenContent)
    }

    updateOverflowIndicator()
    rail.addEventListener('scroll', updateOverflowIndicator, { passive: true })
    window.addEventListener('resize', updateOverflowIndicator)

    const resizeObserver = new ResizeObserver(updateOverflowIndicator)
    resizeObserver.observe(rail)

    return () => {
      rail.removeEventListener('scroll', updateOverflowIndicator)
      window.removeEventListener('resize', updateOverflowIndicator)
      resizeObserver.disconnect()
    }
  }, [])

  return <section className={`${styles.section} ${compact ? styles.compact : ''}`} aria-labelledby="line-navigation-title">
    <div className="shell">
      <header className={`${styles.header} ${compact ? styles.headerCompact : ''}`}>
        {compact
          ? <h2 id="line-navigation-title" className={styles.srOnly}>Linhas de produtos</h2>
          : <div>
            <span className="eyebrow">Navegue pelas linhas</span>
            <h2 id="line-navigation-title">Encontre a família de produtos ideal.</h2>
          </div>}
        <button
          type="button"
          className={`${styles.allLines} ${!activeLine ? styles.allLinesActive : ''}`}
          onClick={() => onSelect('')}
          aria-pressed={!activeLine}
        >
          Todas as linhas
        </button>
      </header>
      <div className={styles.railWrap}>
        <div className={styles.rail} ref={railRef}>
          {commercialLines.map((line) => {
            const lineProducts = products.filter((product) => product.line === line.id && !product.supportMaterial)
            const active = activeLine === line.id

            return <button
              type="button"
              className={`${styles.item} ${active ? styles.active : ''}`}
              key={line.id}
              onClick={() => onSelect(active ? '' : line.id)}
              aria-pressed={active}
              style={{ '--line-accent': line.accent }}
            >
              <span className={styles.logoArea} aria-hidden="true">
                {line.logo
                  ? <img src={line.logo} width={line.logoWidth} height={line.logoHeight} alt="" loading="lazy" decoding="async" />
                  : <span className={styles.logoFallback}>Dream Color <em>Care</em></span>}
              </span>
              <span className={styles.srOnly}>{line.name}</span>
              <span className={styles.meta}><small>{lineProducts.length} {lineProducts.length === 1 ? 'produto' : 'produtos'}</small><span aria-hidden="true">{active ? 'Selecionada' : 'Ver linha'}</span></span>
            </button>
          })}
        </div>
        {hasMoreLines && <span className={styles.scrollHint} aria-hidden="true"><ChevronRight /></span>}
      </div>
    </div>
  </section>
}
