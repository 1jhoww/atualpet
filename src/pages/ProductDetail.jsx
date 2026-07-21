import { ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import { company } from '../data/company'
import { getProduct, products } from '../data/products'
import { getProductCategory, getProductLine } from '../data/productTaxonomy'
import styles from './ProductDetail.module.css'

const getRelatedProducts = (current) => products
  .filter((product) => product.active && product.id !== current.id)
  .filter((product) => current.supportMaterial
    ? product.supportMaterial
    : !product.supportMaterial && (product.line === current.line || product.category === current.category))
  .sort((a, b) => Number(b.line === current.line) - Number(a.line === current.line)
    || Number(b.category === current.category) - Number(a.category === current.category)
    || a.order - b.order)
  .slice(0, 3)

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)

  if (!product) return <div className="not-found-inline"><h1>Produto não encontrado</h1><Link className="button" to="/produtos">Voltar ao catálogo</Link></div>

  const line = getProductLine(product.line)
  const category = getProductCategory(product.category)
  const related = getRelatedProducts(product)
  const hasDetails = product.indication || product.benefits.length > 0 || product.usage || product.notes
  const presentations = product.variants.length > 0
    ? product.variants.map((variant) => `${variant.volume} — ${variant.dilution}`).join(' · ')
    : product.volumes.join(' · ')
  const seoDescription = product.seo.description || product.short || `${product.name}, da linha ${line.name}, no catálogo Atual Pet.`
  const contactSubject = product.supportMaterial ? 'material' : 'produto'
  const whatsappMessage = `Olá! Gostaria de mais informações sobre o ${contactSubject} ${product.name}.\n\nVi o ${contactSubject} no site da Atual Pet.`
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: seoDescription,
    brand: { '@type': 'Brand', name: 'Atual Pet' },
    category: category.name,
    image: product.image,
  }

  return <>
    <Seo title={product.seo.title || product.name} description={seoDescription} path={`/produtos/${product.slug}`} image={product.image} jsonLd={jsonLd} />
    <main className={styles.page}>
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Produtos', to: '/produtos' }, { label: product.name }]} />
        <div className={styles.main}>
          <div className={styles.gallery}>
            {product.supportMaterial && <span className={styles.supportBadge}>Material de apoio</span>}
            <img src={product.image} width={product.imageWidth} height={product.imageHeight} alt={product.imagePending ? `Imagem oficial de ${product.name} pendente` : `${product.name} — ${line.name}`} />
          </div>
          <div className={styles.info}>
            <span className="eyebrow">{line.name} · {category.name}</span>
            <h1>{product.name}</h1>
            {product.short && <p className={styles.lead}>{product.short}</p>}
            {product.description && <p className={styles.description}>{product.description}</p>}
            {(product.dilution || presentations || product.fragrance) && <dl>
              {product.dilution && <div><dt>Diluição</dt><dd>{product.dilution}</dd></div>}
              {presentations && <div><dt>Apresentações</dt><dd>{presentations}</dd></div>}
              {product.fragrance && <div><dt>Fragrância</dt><dd>{product.fragrance}</dd></div>}
            </dl>}
            <div className="button-row"><Link className="button" to="/onde-encontrar">Onde encontrar <ArrowRight size={16} /></Link><a className="button button--outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Falar pelo WhatsApp sobre ${product.name}`}><FaWhatsapp aria-hidden="true" /> Falar pelo WhatsApp</a></div>
          </div>
        </div>

        {hasDetails && <div className={styles.details}>
          <section><span className="eyebrow">Aplicação</span><h2>Informações do produto</h2></section>
          <div>
            {product.indication && <article><h3>Indicação</h3><p>{product.indication}</p></article>}
            {product.benefits.length > 0 && <article><h3>Benefícios</h3><ul>{product.benefits.map((item) => <li key={item}>{item}</li>)}</ul></article>}
            {product.usage && <article><h3>Modo de uso</h3><p>{product.usage}</p></article>}
            {product.notes && <article><h3>Informação importante</h3><p>{product.notes}</p></article>}
          </div>
        </div>}

        {related.length > 0 && <section className={styles.related}><h2>Você também pode conhecer</h2><div className="product-grid product-grid--three">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
      </div>
    </main>
  </>
}
