import { ArrowRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { getLine } from '../data/lines'
import { products } from '../data/products'
import styles from './LinePage.module.css'

export default function LinePage() {
  const { slug } = useParams()
  const line = getLine(slug)
  if (!line) return <Navigate to="/404" replace/>
  const lineProducts = products.filter((product) => product.line === slug)

  return <>
    <Seo title={`Linha ${line.name}`} description={line.description} path={`/linhas/${slug}`} image={line.image}/>
    <main className={`${styles.page} ${styles[line.tone]}`}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} shell`}>
          <div className={styles.heroCopy}><span className="eyebrow">{line.eyebrow}</span><h1>{line.name}</h1><p>{line.headline}</p><Link className="text-link" to={`/produtos?linha=${line.slug}`}>Ver produtos <ArrowRight size={16}/></Link></div>
          <div className={styles.heroMedia}><img src={line.image} width="1920" height="900" alt={`Produtos da linha ${line.name}`}/></div>
        </div>
      </section>

      <Reveal as="section" className={`${styles.manifesto} shell section`}>
        <div><span className="eyebrow">A proposta</span><h2>{line.headline}</h2></div>
        <div><p>{line.description}</p><ul>{line.benefits.map(item=><li key={item}><Check size={17}/>{item}</li>)}</ul></div>
      </Reveal>

      <section className={`${styles.campaign} section`}>
        <div className={`${styles.campaignInner} shell`}>
          <Reveal as="figure" className={styles.campaignMedia} data-reveal="image">
            <img src={line.storyImage} width="1600" height="1067" loading="lazy" alt={line.storyImageAlt}/>
          </Reveal>
          <Reveal className={styles.campaignCopy} delay={100}>
            <span className="eyebrow">Do cuidado ao acabamento</span>
            <h2>Uma linha pensada como parte de uma experiência completa.</h2>
            <ol>{line.story.map(([title, text], index)=><li key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>)}</ol>
          </Reveal>
        </div>
      </section>

      <section className={`${styles.products} section`}><div className="shell">
        <div className={styles.productsTop}><div><span className="eyebrow">Portfólio</span><h2>Produtos da linha</h2></div><Link className="button button--outline" to="/onde-encontrar">Onde encontrar</Link></div>
        <div className="product-grid product-grid--three">{lineProducts.map(product=><ProductCard key={product.id} product={product}/>)}</div>
      </div></section>

      <Reveal as="section" className={`${styles.final} shell section`}><h2>Explore todas as possibilidades do portfólio Atual Pet.</h2><Link className="button" to="/produtos">Catálogo completo <ArrowRight size={16}/></Link></Reveal>
    </main>
  </>
}
