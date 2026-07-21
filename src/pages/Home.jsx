import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import BathTransformation from '../components/BathTransformation'
import BrandPillars from '../components/BrandPillars'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TechnicalCredibility from '../components/TechnicalCredibility'
import { company } from '../data/company'
import { homeEditorial } from '../data/home'
import { lines } from '../data/lines'
import { compareLaunchDate, products } from '../data/products'
import styles from './Home.module.css'

const HOME_LAUNCH_LIMIT = 3

export default function Home() {
  const launches = products
    .filter((product) => product.active && product.isLaunch)
    .sort(compareLaunchDate)
  const homeLaunches = launches.slice(0, HOME_LAUNCH_LIMIT)
  return <>
    <Seo title="Atual Pet | Cosméticos profissionais para pets" description={`${company.legalPositioning}.`} path="/" jsonLd={{'@context':'https://schema.org','@type':'Organization',name:'Atual Pet',description:company.legalPositioning,url:'https://atualpet.com.br',email:company.email,telephone:company.phone}}/>

    <BathTransformation content={company.homeTransformation}/>

    <TechnicalCredibility content={homeEditorial.technicalCredibility}/>

    <section className={`${styles.lines} section`} aria-labelledby="lines-title">
      <div className="shell">
        <Reveal as="header" className={styles.linesHeading}><div><span className="eyebrow">Quatro universos</span><h2 id="lines-title">Uma linha para cada intenção de cuidado.</h2></div><p>Identidades próprias para diferentes rotinas, unidas pela experiência profissional Atual Pet.</p></Reveal>
        <div className={styles.lineList}>{lines.map((line, index)=><Reveal as="article" key={line.slug} data-reveal="image" className={`${styles.lineRow} ${styles[line.tone]} ${index % 2 ? styles.lineRowReverse : ''}`}>
          <div className={styles.lineCopy}><span className={styles.lineIndex}>0{index + 1}</span><span className="eyebrow">{line.eyebrow}</span><h3>{line.name}</h3><p>{line.description}</p><Link className={`button button--outline button--small ${styles.actionButton}`} to={`/linhas/${line.slug}`}>Conheça a linha <ArrowRight size={16}/></Link></div>
          <div className={styles.lineVisual}>
            <picture>
              {line.homeMobileBanner && <source media="(max-width: 620px)" srcSet={line.homeMobileBanner}/>}
              <img src={line.homeBanner || line.image} width={line.homeBannerWidth} height={line.homeBannerHeight} loading="lazy" decoding="async" alt={`Produtos da linha ${line.name}`}/>
            </picture>
          </div>
        </Reveal>)}</div>
      </div>
    </section>

    {launches.length > 0 && <section className={`${styles.launches} section`} aria-labelledby="home-launches-title">
      <div className="shell">
        <Reveal as="header" className={styles.launchesHeading}>
          <div><span className="eyebrow">Novidades do portfólio</span><h2 id="home-launches-title">Lançamentos Atual Pet</h2></div>
          <div className={styles.launchesIntro}><p>Conheça os produtos que acabam de chegar ao portfólio Atual Pet.</p><Link className={`button button--outline button--small ${styles.actionButton}`} to="/lancamentos">Ver lançamentos <ArrowRight size={16}/></Link></div>
        </Reveal>
        <div className={styles.launchLayout}>{homeLaunches.map((product, index)=><Reveal className={styles.launchCard} delay={index * 70} key={product.id}><ProductCard product={product}/></Reveal>)}</div>
      </div>
    </section>}

    <section className={styles.pillars} aria-labelledby="brand-pillars-title">
      <div className="shell">
        <Reveal className={styles.pillarsIntro}><span className="eyebrow">O que orienta a marca</span><p id="brand-pillars-title">Performance profissional com uma experiência de cuidado mais sensorial.</p></Reveal>
        <BrandPillars/>
      </div>
    </section>

    <section className={`${styles.testimonials} section`} aria-labelledby="home-testimonials-title">
      <div className="shell">
        <Reveal as="header" className={styles.testimonialsHeading}><span className="eyebrow">{homeEditorial.testimonials.eyebrow}</span><h2 id="home-testimonials-title">{homeEditorial.testimonials.title}</h2></Reveal>
        <div className={styles.testimonialGrid}>{homeEditorial.testimonials.items.map((testimonial, index) => <Reveal as="blockquote" className={styles.testimonial} delay={index * 70} key={testimonial.id}><p>“{testimonial.quote}”</p><cite>{testimonial.attribution}</cite></Reveal>)}</div>
      </div>
    </section>

    <Reveal as="section" className={`${styles.history} shell section`} aria-labelledby="home-history-title">
      <figure className={styles.historyMedia}><img src={homeEditorial.history.image} width={homeEditorial.history.imageWidth} height={homeEditorial.history.imageHeight} loading="lazy" alt={homeEditorial.history.imageAlt}/></figure>
      <div className={styles.historyCopy}><span className="eyebrow">{homeEditorial.history.eyebrow}</span><h2 id="home-history-title">{homeEditorial.history.title}</h2>{homeEditorial.history.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className={`button button--outline ${styles.actionButton}`} to={homeEditorial.history.ctaUrl}>{homeEditorial.history.ctaLabel} <ArrowRight size={16}/></Link></div>
    </Reveal>

    <section className={`${styles.commercial} shell section`}>
      <Reveal className={styles.find}><MapPin/><span className="eyebrow">Distribuidores parceiros</span><h2>Encontre produtos Atual Pet na sua região.</h2><p>Consulte os distribuidores parceiros que comercializam os produtos Atual Pet em diferentes regiões.</p><Link className={`button button--outline ${styles.actionButton}`} to="/onde-encontrar">Onde encontrar <ArrowRight size={16}/></Link></Reveal>
      <Reveal className={styles.partner} delay={100}><span className="eyebrow">Parceria comercial</span><h2>Quer distribuir Atual Pet?</h2><p>A equipe recebe candidaturas de empresas interessadas em atender suas regiões. Toda solicitação passa por análise comercial.</p><Link className="button" to="/seja-um-distribuidor">Seja um distribuidor</Link></Reveal>
    </section>
  </>
}
