import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import vanillaBannerWebp from '../assets/lancamentos/banners/dream-color-vanilla.webp'
import masksBannerWebp from '../assets/lancamentos/banners/the-luxe-mascaras-60-segundos.webp'
import launchesHeroImage from '../assets/lancamentos/hero/hero-lancamentos-conjuntos.webp'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import styles from './Launches.module.css'

const launchCatalogUrl = (filters = {}) => {
  const search = new URLSearchParams({ lancamento: 'true', ...filters })
  return `/produtos?${search.toString()}`
}

const allLaunchesUrl = launchCatalogUrl()
const masksUrl = launchCatalogUrl({ linha: 'the-luxe' })
const vanillaUrl = launchCatalogUrl({ busca: 'Vanilla' })
const jasmineUrl = launchCatalogUrl({ busca: 'Jasmim com Amêndoas' })

export default function Launches() {
  return <>
    <Seo
      title="Lançamentos | Atual Pet"
      description="Conheça os lançamentos Atual Pet das linhas The Luxe e Dream Color."
      path="/lancamentos"
    />

    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="launches-title">
        <div className={`${styles.heroInner} shell`}>
          <Reveal className={styles.heroCopy}>
            <span className="eyebrow">Lançamentos Atual Pet</span>
            <h1 id="launches-title">Novas experiências para o cuidado profissional.</h1>
            <p>Conheça as campanhas e novidades mais recentes das linhas Atual Pet.</p>
            <Link className="button" to={allLaunchesUrl}>Ver todos os lançamentos <ArrowRight size={17}/></Link>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={100} data-reveal="image">
            <img
              className={styles.heroImage}
              src={launchesHeroImage}
              width="1672"
              height="940"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              alt="Produtos dos lançamentos Vanilla Dream Color e máscara The Luxe da Atual Pet"
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.campaigns} aria-label="Campanhas de lançamentos Atual Pet">
        <div className={`${styles.campaignList} shell`}>
          <Reveal as="article" id="campanha-the-luxe" className={styles.campaign} data-reveal="image">
            <div className={styles.campaignViewport}>
              <Link
                className={styles.campaignLink}
                to={masksUrl}
                aria-label="Conhecer as máscaras de ação rápida The Luxe"
              >
                <img
                  src={masksBannerWebp}
                  width="1536"
                  height="1024"
                  loading="eager"
                  decoding="async"
                  alt="Máscaras de ação rápida The Luxe em quatro versões, com ação em 60 segundos"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal as="article" className={styles.campaign} data-reveal="image">
            <div className={styles.campaignViewport}>
              <Link
                className={styles.campaignLink}
                to={vanillaUrl}
                aria-label="Conhecer os lançamentos Vanilla da linha Dream Color"
              >
                <img
                  src={vanillaBannerWebp}
                  width="1536"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  alt="Lançamentos Vanilla da linha Dream Color com shampoo, condicionador, colônia e aromatizador"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className={`${styles.jasmine} shell`} aria-labelledby="jasmine-title">
        <div>
          <span className="eyebrow">Dream Color</span>
          <h2 id="jasmine-title">Jasmim com Amêndoas</h2>
        </div>
        <div className={styles.jasmineCopy}>
          <p>Uma nova fragrância chega em breve à linha Dream Color.</p>
          <Link className="button button--outline" to={jasmineUrl}>Ver produtos <ArrowRight size={17}/></Link>
        </div>
      </Reveal>

      <Reveal as="section" className={`${styles.finalCta} shell`} aria-labelledby="all-launches-title">
        <span className="eyebrow">Novidades Atual Pet</span>
        <h2 id="all-launches-title">Conheça todos os lançamentos Atual Pet.</h2>
        <p>Veja os produtos, apresentações e informações completas no catálogo.</p>
        <Link className="button" to={allLaunchesUrl}>Ver catálogo de lançamentos <ArrowRight size={17}/></Link>
      </Reveal>
    </main>
  </>
}
