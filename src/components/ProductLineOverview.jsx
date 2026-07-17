import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productLines } from '../data/productTaxonomy'
import styles from './ProductLineOverview.module.css'

const commercialLines = productLines.filter((line) => !line.supportMaterial)

const countLabel = (count) => `${count} ${count === 1 ? 'produto' : 'produtos'}`

const ProductLineOverview = forwardRef(function ProductLineOverview({ line, products, visibleCount, hasAdditionalFilters }, ref) {
  const commercialProducts = products.filter((product) => !product.supportMaterial)

  if (!line) {
    return <section ref={ref} className={`${styles.section} ${styles.general}`} aria-labelledby="portfolio-overview-title">
      <div className={`${styles.generalInner} shell`} key="portfolio-overview">
        <header>
          <span className="eyebrow">Portfólio Atual Pet</span>
          <h2 id="portfolio-overview-title">Propostas diferentes para cada momento do cuidado.</h2>
          <p>Conheça as linhas Atual Pet e encontre a opção que melhor se conecta à sua rotina profissional, do cuidado essencial à perfumaria ultra premium.</p>
          <small>{countLabel(commercialProducts.length)} distribuídos em cinco linhas.</small>
        </header>
        <div className={styles.comparison} aria-label="Posicionamento das linhas Atual Pet">
          {commercialLines.map((item) => <article key={item.id}>
            <strong>{item.name}</strong>
            <span>{item.tier}</span>
            <p>{item.focus}</p>
          </article>)}
        </div>
      </div>
    </section>
  }

  const lineProducts = products.filter((product) => product.line === line.id && !product.supportMaterial)
  const visualProducts = line.visualProducts
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean)
  const status = hasAdditionalFilters && visibleCount !== lineProducts.length
    ? `${countLabel(lineProducts.length)} na linha · ${countLabel(visibleCount)} com os filtros atuais`
    : `${countLabel(lineProducts.length)} na linha`

  return <section
    ref={ref}
    className={styles.section}
    aria-labelledby="selected-line-title"
    style={{ '--line-accent': line.accent, '--line-surface': line.surface }}
  >
    <div className={`${styles.selectedInner} shell`} key={line.id}>
      <div className={styles.copy}>
        <span className={styles.tier}>{line.tier}</span>
        <p className={styles.kicker}>{line.shortDescription}</p>
        <h2 id="selected-line-title">{line.name}</h2>
        <p className={styles.description}>{line.description}</p>
        <ul className={styles.highlights} aria-label={`Destaques da linha ${line.name}`}>
          {line.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className={styles.footerRow}>
          <p className={styles.count} aria-live="polite" aria-atomic="true">{status}</p>
          {line.route && <Link to={line.route}>Ver detalhes da linha <ArrowRight size={16} /></Link>}
        </div>
      </div>
      <div className={styles.media} aria-hidden={visualProducts.length === 0}>
        <span className={styles.mediaLabel}>{line.focus}</span>
        {visualProducts.map((product, index) => <img
          className={index === 0 ? styles.primaryProduct : styles.secondaryProduct}
          key={product.id}
          src={product.image}
          width={product.imageWidth}
          height={product.imageHeight}
          alt={`${product.name} da linha ${line.name}`}
          loading="lazy"
          decoding="async"
        />)}
      </div>
    </div>
  </section>
})

export default ProductLineOverview
