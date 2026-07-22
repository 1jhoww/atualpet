import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Gauge,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import vanillaBannerWebp from '../assets/lancamentos/banners/dream-color-vanilla.webp'
import masksBannerWebp from '../assets/lancamentos/banners/the-luxe-mascaras-60-segundos.webp'
import launchesHeroImage from '../assets/lancamentos/hero/hero-lancamentos-conjuntos.webp'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { compareLaunchDate, products } from '../data/products'
import styles from './Launches.module.css'

const launchCatalogUrl = (filters = {}) => {
  const search = new URLSearchParams({ lancamento: 'true', ...filters })
  return `/produtos?${search.toString()}`
}

const masksUrl = launchCatalogUrl({ linha: 'the-luxe' })
const vanillaUrl = launchCatalogUrl({ busca: 'Vanilla' })
const launchProducts = products
  .filter((product) => product.isLaunch)
  .sort(compareLaunchDate)

const maskVersions = ['Cereja e Avelã', 'Lichia e Romã', 'Melancia', 'Neutro']
const vanillaProducts = ['Shampoo', 'Condicionador', 'Colônia', 'Aromatizador']

const technologyHighlights = [
  {
    title: 'Novas fragrâncias',
    description: 'Experiências sensoriais que renovam o cuidado profissional.',
    Icon: Sparkles,
  },
  {
    title: 'Desenvolvimento profissional',
    description: 'Novidades pensadas para diferentes etapas do banho e tosa.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Alta performance',
    description: 'Soluções que ampliam as possibilidades da rotina profissional.',
    Icon: Gauge,
  },
  {
    title: 'Qualidade Atual Pet',
    description: 'O cuidado da marca presente em cada novo lançamento.',
    Icon: BadgeCheck,
  },
]

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
            <span className="eyebrow">Lançamentos</span>
            <h1 id="launches-title">Novas experiências para o cuidado profissional.</h1>
            <p>Conheça os lançamentos mais recentes da Atual Pet, desenvolvidos para profissionais de banho e tosa.</p>
            <a className="button" href="#todos-os-lancamentos">
              Ver lançamentos <ArrowDown size={17} aria-hidden="true" />
            </a>
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
        <article id="campanha-the-luxe" className={`${styles.campaign} shell`}>
          <Reveal className={styles.campaignCopy}>
            <span className="eyebrow">The Luxe · 60 segundos</span>
            <h2>Máscaras de Ação Rápida</h2>
            <p className={styles.campaignLead}>Alta performance em 60 segundos para a rotina profissional.</p>
            <p>Quatro versões desenvolvidas para ampliar as possibilidades de cuidado e acabamento.</p>
            <ul className={styles.chips} aria-label="Versões das máscaras de ação rápida">
              {maskVersions.map((version) => <li key={version}>{version}</li>)}
            </ul>
          </Reveal>

          <Reveal className={styles.campaignMedia} delay={90} data-reveal="image">
            <Link
              className={styles.campaignLink}
              to={masksUrl}
              aria-label="Conhecer as máscaras de ação rápida The Luxe"
            >
              <img
                src={masksBannerWebp}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                alt="Máscaras de ação rápida The Luxe em quatro versões, com ação em 60 segundos"
              />
            </Link>
          </Reveal>
        </article>

        <article className={`${styles.campaign} ${styles.campaignReverse} shell`}>
          <Reveal className={styles.campaignMedia} data-reveal="image">
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
          </Reveal>

          <Reveal className={styles.campaignCopy} delay={90}>
            <span className="eyebrow">Dream Color · Vanilla</span>
            <h2>Dream Color</h2>
            <p className={styles.campaignLead}>Uma nova geração de produtos para elevar a experiência no banho e tosa.</p>
            <p>A fragrância Vanilla chega em diferentes etapas da rotina profissional.</p>
            <ul className={styles.chips} aria-label="Lançamentos Vanilla Dream Color">
              {vanillaProducts.map((product) => <li key={product}>{product}</li>)}
            </ul>
          </Reveal>
        </article>
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <div className="shell">
          <Reveal as="header" className={styles.technologyHeading}>
            <span className="eyebrow">Pesquisa · experiência · performance</span>
            <h2 id="technology-title">Tecnologia que chegou ao mercado.</h2>
            <p>Novidades que unem experiência sensorial, desenvolvimento profissional e o cuidado presente nas linhas Atual Pet.</p>
          </Reveal>

          <div className={styles.technologyGrid}>
            {technologyHighlights.map(({ title, description, Icon }, index) => (
              <Reveal as="article" className={styles.technologyItem} delay={index * 70} key={title}>
                <Icon size={27} strokeWidth={1.35} aria-hidden="true" />
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="todos-os-lancamentos" className={styles.products} aria-labelledby="all-launches-title">
        <div className="shell">
          <Reveal as="header" className={styles.productsHeading}>
            <div>
              <span className="eyebrow">Coleção atual</span>
              <h2 id="all-launches-title">Todos os lançamentos</h2>
            </div>
            <p>Conheça os produtos apresentados nas campanhas e outras novidades recentes da Atual Pet.</p>
          </Reveal>

          <Reveal className={`product-grid ${styles.productGrid}`}>
            {launchProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className={`${styles.finalCta} shell`} aria-labelledby="launches-cta-title">
        <span className="eyebrow">Disponibilidade regional</span>
        <h2 id="launches-cta-title">Gostou dos lançamentos?</h2>
        <p>Encontre um distribuidor Atual Pet e conheça toda a linha.</p>
        <Link className="button" to="/onde-encontrar">
          Onde encontrar <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </Reveal>
    </main>
  </>
}
