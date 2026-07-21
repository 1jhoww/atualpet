import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProductCategory, getProductLine } from '../data/productTaxonomy'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const line = getProductLine(product.line)
  const category = getProductCategory(product.category)
  const presentations = product.variants.length > 0
    ? product.variants.map((variant) => `${variant.volume} (${variant.dilution})`).join(' · ')
    : product.volumes.join(' · ')
  const details = [presentations, product.variants.length === 0 && product.dilution && `Diluição ${product.dilution}`].filter(Boolean)

  return <article className={`${styles.card} ${product.supportMaterial ? styles.supportCard : ''}`}>
    <Link to={`/produtos/${product.slug}`} className={styles.imageWrap} aria-label={`Ver ${product.name}`}>
      {product.isLaunch && <span className={styles.launchBadge}>Lançamento</span>}
      {product.supportMaterial && <span className={styles.supportBadge}>Material de apoio</span>}
      <img src={product.image} width={product.imageWidth} height={product.imageHeight} loading="lazy" decoding="async" alt={product.imagePending ? `Imagem oficial de ${product.name} pendente` : `${product.name} — ${line.name}`} />
    </Link>
    <div className={styles.meta}><span>{line.name}</span><span>{category.name}</span></div>
    <h3><Link to={`/produtos/${product.slug}`}>{product.name}</Link></h3>
    {product.short && <p>{product.short}</p>}
    <div className={styles.bottom}>
      {details.length > 0 && <span>{details.join(' · ')}</span>}
      <Link className={styles.cta} to={`/produtos/${product.slug}`} aria-label={`Saiba mais sobre ${product.name}`}>Saiba mais <ArrowUpRight size={17} /></Link>
    </div>
  </article>
}
