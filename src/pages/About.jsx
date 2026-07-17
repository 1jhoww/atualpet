import { ArrowRight, FlaskConical, HeartHandshake, Layers3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import AboutPrinciples from '../components/AboutPrinciples'
import InstitutionalVideo from '../components/InstitutionalVideo'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { aboutContent } from '../data/about'
import { company } from '../data/company'
import styles from './About.module.css'

const commitmentIcons = {
  portfolio: FlaskConical,
  clarity: ShieldCheck,
  partners: HeartHandshake,
  lines: Layers3,
}

export default function About() {
  const { hero, whoWeAre, history, careJourney, commitment, principles, finalCta } = aboutContent

  return <>
    <Seo title="A Atual Pet" description="Conheça a marca brasileira de cosméticos profissionais para pets e sua atuação no mercado pet." path="/sobre"/>
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={`${styles.heroInner} shell`}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 id="about-hero-title">{hero.title}</h1>
            <p>{hero.description}</p>
          </div>
        </div>
      </section>

      <InstitutionalVideo video={company.institutionalVideo}/>

      <Reveal as="section" className={`${styles.history} shell`} aria-labelledby="about-history-title">
        <figure className={styles.historyMedia}><img src={history.image} width={history.imageWidth} height={history.imageHeight} loading="lazy" alt={history.imageAlt}/></figure>
        <div className={styles.historyCopy}><span className="eyebrow">{history.eyebrow}</span><h2 id="about-history-title">{history.title}</h2>{history.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </Reveal>

      <Reveal as="section" className={`${styles.who} shell section`} aria-labelledby="who-we-are-title">
        <header className={styles.whoHeading}>
          <span className="eyebrow">{whoWeAre.eyebrow}</span>
          <h2 id="who-we-are-title">{whoWeAre.title}</h2>
        </header>
        <div className={styles.whoBody}>
          <div className={styles.whoText}>{whoWeAre.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <ul className={styles.highlights}>{whoWeAre.highlights.map((highlight, index) => <li key={highlight}><span>0{index + 1}</span>{highlight}</li>)}</ul>
        </div>
      </Reveal>

      <div className={styles.careJourney} aria-label={careJourney.label}>
        {careJourney.items.map((item, index) => <section key={item.id} className={`${styles.story} ${index % 2 ? styles.storyReverse : ''} shell`}>
          <Reveal as="figure" className={styles.storyMedia} data-reveal="image">
            <img src={item.image} width={item.imageWidth} height={item.imageHeight} loading="lazy" alt={item.imageAlt}/>
          </Reveal>
          <Reveal className={styles.storyCopy} delay={100}>
            <span className="eyebrow">{item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {item.cta && <Link className="text-link" to={item.cta.url}>{item.cta.label} <ArrowRight size={16}/></Link>}
          </Reveal>
        </section>)}
      </div>

      <section className={`${styles.commitment} section`} aria-labelledby="about-commitment-title">
        <div className="shell">
          <Reveal as="header" className={styles.commitmentHeading}>
            <span className="eyebrow">{commitment.eyebrow}</span>
            <h2 id="about-commitment-title">{commitment.title}</h2>
          </Reveal>
          <div className={styles.commitmentGrid}>
            {commitment.items.map((item, index) => {
              const Icon = commitmentIcons[item.icon]
              return <Reveal key={item.id} delay={index * 80}>
                <Icon aria-hidden="true"/>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            })}
          </div>
        </div>
      </section>

      <AboutPrinciples content={principles}/>

      <Reveal as="section" className={`${styles.finalCta} shell`} aria-labelledby="about-final-cta-title">
        <div className={styles.finalCtaCopy}>
          <span className="eyebrow">{finalCta.eyebrow}</span>
          <h2 id="about-final-cta-title">{finalCta.title}</h2>
          <p>{finalCta.description}</p>
          <div className={`button-row ${styles.ctaActions}`}>
            <Link className="button" to={finalCta.primaryUrl}>{finalCta.primaryLabel} <ArrowRight size={17}/></Link>
            <Link className={`button ${styles.secondaryCta}`} to={finalCta.secondaryUrl}>{finalCta.secondaryLabel}</Link>
          </div>
        </div>
        <figure className={styles.finalCtaMedia}>
          <img src={finalCta.image} width={finalCta.imageWidth} height={finalCta.imageHeight} loading="lazy" alt={finalCta.imageAlt}/>
        </figure>
      </Reveal>
    </main>
  </>
}
