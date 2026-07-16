import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import BathTransformation from '../components/BathTransformation'
import BrandPillars from '../components/BrandPillars'
import HomeProcessTimeline from '../components/HomeProcessTimeline'
import InstitutionalVideo from '../components/InstitutionalVideo'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { company } from '../data/company'
import { lines } from '../data/lines'
import { products } from '../data/products'
import styles from './Home.module.css'

export default function Home() {
  const launches = products.filter((product) => product.active && product.isLaunch)
  return <>
    <Seo title="Atual Pet | Cosméticos profissionais para pets" description="Fabricante brasileira de cosméticos profissionais para higiene, estética, perfumaria e cuidado animal." path="/" jsonLd={{'@context':'https://schema.org','@type':'Organization',name:'Atual Pet',url:'https://atualpet.com.br',email:company.email,telephone:company.phone}}/>

    <BathTransformation content={company.homeTransformation}/>

    <HomeProcessTimeline content={company.homeProcess}/>

    <section className={styles.pillars} aria-labelledby="brand-pillars-title">
      <div className="shell">
        <Reveal className={styles.pillarsIntro}><span className="eyebrow">O que orienta a marca</span><p id="brand-pillars-title">Performance profissional com uma experiência de cuidado mais sensorial.</p></Reveal>
        <BrandPillars/>
      </div>
    </section>

    <InstitutionalVideo video={company.institutionalVideo}/>

    <section className={`${styles.lines} section`} aria-labelledby="lines-title">
      <div className="shell">
        <Reveal as="header" className={styles.linesHeading}><div><span className="eyebrow">Quatro universos</span><h2 id="lines-title">Uma linha para cada intenção de cuidado.</h2></div><p>Identidades próprias para diferentes rotinas, unidas pela experiência profissional Atual Pet.</p></Reveal>
        <div className={styles.lineList}>{lines.map((line, index)=><Reveal as="article" key={line.slug} data-reveal="image" className={`${styles.lineRow} ${styles[line.tone]} ${index % 2 ? styles.lineRowReverse : ''}`}>
          <div className={styles.lineCopy}><span className={styles.lineIndex}>0{index + 1}</span><span className="eyebrow">{line.eyebrow}</span><h3>{line.name}</h3><p>{line.description}</p><Link className="text-link" to={`/linhas/${line.slug}`}>Conheça a linha <ArrowRight size={16}/></Link></div>
          <div className={styles.lineVisual}><img src={line.image} width="1200" height="650" loading="lazy" alt={`Produtos da linha ${line.name}`}/></div>
        </Reveal>)}</div>
      </div>
    </section>

    {launches.length > 0 && <section className={`${styles.launches} section`}>
      <div className="shell"><header><span className="eyebrow">Novidades do portfólio</span><h2>Lançamentos Atual Pet</h2><Link className="text-link" to="/produtos?lancamento=true">Ver lançamentos <ArrowRight size={16}/></Link></header>
        <div className={styles.launchLayout}>{launches.map((product)=><Link key={product.id} to={`/produtos/${product.slug}`}><span>Lançamento</span><img src={product.image} alt={product.name} width="600" height="700" loading="lazy"/><h3>{product.name}</h3></Link>)}</div>
      </div>
    </section>}

    <section className={`${styles.commercial} shell section`}>
      <Reveal className={styles.find}><MapPin/><span className="eyebrow">Distribuidores parceiros</span><h2>Encontre produtos Atual Pet na sua região.</h2><p>Consulte os pontos de contato regionais que comercializam os produtos fabricados pela Atual Pet.</p><Link className="text-link" to="/onde-encontrar">Onde encontrar <ArrowRight size={16}/></Link></Reveal>
      <Reveal className={styles.partner} delay={100}><span className="eyebrow">Parceria comercial</span><h2>Quer distribuir Atual Pet?</h2><p>A fabricante recebe candidaturas de empresas interessadas em atender suas regiões. Toda solicitação passa por análise comercial.</p><Link className="button" to="/seja-um-distribuidor">Seja um distribuidor</Link></Reveal>
    </section>
  </>
}
