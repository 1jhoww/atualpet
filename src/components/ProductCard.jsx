import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getLine } from '../data/lines'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const line = getLine(product.line)
  return <article className={styles.card}>
    <Link to={`/produtos/${product.slug}`} className={styles.imageWrap} aria-label={`Ver ${product.name}`}>{product.isLaunch&&<span className={styles.launchBadge}>Lançamento</span>}<img src={product.image} width="560" height="650" loading="lazy" alt={product.imagePending ? `Imagem pendente para ${product.name}` : `${product.name} — ${line.name}`} /></Link>
    <div className={styles.meta}><span>{line.name}</span><span>{product.category.replace('-', ' ')}</span></div>
    <h3><Link to={`/produtos/${product.slug}`}>{product.name}</Link></h3><p>{product.short}</p>
    <div className={styles.bottom}><span>{product.volumes.join(' · ') || 'Apresentação a confirmar'}</span><Link to={`/produtos/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}><ArrowUpRight size={18}/></Link></div>
  </article>
}
