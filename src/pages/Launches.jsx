import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Gauge,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import extraVolumeBannerWebp from '../assets/lancamentos/banners/dream-color-extra-volume.webp'
import jasmimBannerWebp from '../assets/lancamentos/banners/dream-color-jasmim.webp'
import vanillaBannerWebp from '../assets/lancamentos/banners/dream-color-vanilla.webp'
import masksBannerDesktopWebp from '../assets/lancamentos/banners/the-luxe-cronograma-desktop.webp'
import masksBannerMobileWebp from '../assets/lancamentos/banners/the-luxe-cronograma-mobile.webp'
import launchesHeroImage from '../assets/lancamentos/hero/hero-lancamentos-conjuntos.webp'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { amazonExclusiveLine } from '../data/amazonExclusive'
import { compareLaunchDate, products } from '../data/products'
import styles from './Launches.module.css'

const launchCatalogUrl = (filters = {}) => {
  const search = new URLSearchParams({ lancamento: 'true', ...filters })
  return `/produtos?${search.toString()}`
}

const masksUrl = launchCatalogUrl({ linha: 'the-luxe' })
const vanillaUrl = launchCatalogUrl({ busca: 'Vanilla' })
const jasmimUrl = launchCatalogUrl({ linha: 'dream-color', busca: 'Jasmim' })
const launchProducts = products
  .filter((product) => product.isLaunch)
  .sort(compareLaunchDate)

const productLink = (label, slug) => {
  const product = products.find((item) => item.active && item.slug === slug)
  if (!product) throw new Error(`Produto de lançamento não encontrado: ${slug}`)
  return { label, productName: product.name, to: `/produtos/${product.slug}` }
}

const maskVersions = [
  productLink('Cereja e Avelã', 'mascara-acao-rapida-cereja-e-avela'),
  productLink('Lichia e Romã', 'mascara-acao-rapida-lichia-e-roma'),
  productLink('Melancia', 'mascara-acao-rapida-melancia'),
  productLink('Neutro', 'mascara-acao-rapida-neutro'),
]
const vanillaProducts = [
  productLink('Shampoo', 'shampoo-vanilla'),
  productLink('Condicionador', 'condicionador-vanilla'),
  productLink('Colônia', 'colonia-vanilla'),
  productLink('Aromatizador', 'aromatizador-vanilla'),
]
const jasmimProducts = [
  productLink('Shampoo', 'shampoo-jasmim-com-amendoas'),
  productLink('Condicionador', 'condicionador-jasmim-com-amendoas'),
  productLink('Colônia', 'colonia-jasmim-com-amendoas'),
  productLink('Aromatizador', 'aromatizador-jasmim-com-amendoas'),
]
const extraVolumeProduct = productLink('Shampoo Extra Volume', 'shampoo-extra-volume')
const extraVolumeDetails = ['Shampoo', '1 L', 'Diluição 1:5']

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
              {maskVersions.map((version) => <li key={version.to}>
                <Link className={styles.chipLink} to={version.to} aria-label={`Ver ${version.productName}`}>
                  {version.label}<ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
            <Link className={`button button--outline button--small ${styles.campaignCta}`} to={masksUrl}>
              Conheça as máscaras <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal className={styles.campaignMedia} delay={90} data-reveal="image">
            <Link
              className={styles.campaignLink}
              to={masksUrl}
              aria-label="Conhecer as máscaras de ação rápida The Luxe"
            >
              <picture>
                <source media="(max-width: 620px)" srcSet={masksBannerMobileWebp} />
                <img
                  src={masksBannerDesktopWebp}
                  width="3600"
                  height="2400"
                  loading="lazy"
                  decoding="async"
                  alt="Máscaras de ação rápida The Luxe em quatro versões, com ação em 60 segundos"
                />
              </picture>
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
              {vanillaProducts.map((product) => <li key={product.to}>
                <Link className={styles.chipLink} to={product.to} aria-label={`Ver ${product.productName}`}>
                  {product.label}<ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
            <Link className={`button button--outline button--small ${styles.campaignCta}`} to={vanillaUrl}>
              Conheça os produtos Vanilla <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </article>

        <article className={`${styles.campaign} shell`}>
          <Reveal className={styles.campaignCopy}>
            <span className="eyebrow">Dream Color · Jasmim e Amêndoas</span>
            <h2>Dream Color</h2>
            <p className={styles.campaignLead}>Jasmim e Amêndoas em diferentes etapas da rotina profissional.</p>
            <p>Shampoo, condicionador, colônia e aromatizador reunidos na linha Dream Color.</p>
            <ul className={styles.chips} aria-label="Lançamentos Jasmim e Amêndoas Dream Color">
              {jasmimProducts.map((product) => <li key={product.to}>
                <Link className={styles.chipLink} to={product.to} aria-label={`Ver ${product.productName}`}>
                  {product.label}<ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>)}
            </ul>
            <Link className={`button button--outline button--small ${styles.campaignCta}`} to={jasmimUrl}>
              Conheça os produtos Jasmim <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal className={styles.campaignMedia} delay={90} data-reveal="image">
            <Link
              className={styles.campaignLink}
              to={jasmimUrl}
              aria-label="Conhecer os lançamentos Jasmim e Amêndoas da linha Dream Color"
            >
              <img
                src={jasmimBannerWebp}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                alt="Lançamentos Jasmim e Amêndoas da linha Dream Color com shampoo, condicionador, colônia e aromatizador"
              />
            </Link>
          </Reveal>
        </article>

        <article className={`${styles.campaign} ${styles.campaignReverse} shell`}>
          <Reveal className={styles.campaignMedia} data-reveal="image">
            <Link
              className={styles.campaignLink}
              to={extraVolumeProduct.to}
              aria-label="Conhecer o Shampoo Extra Volume Dream Color Care"
            >
              <img
                src={extraVolumeBannerWebp}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                alt="Shampoo Extra Volume da linha Dream Color Care em embalagem de 1 litro"
              />
            </Link>
          </Reveal>

          <Reveal className={styles.campaignCopy} delay={90}>
            <span className="eyebrow">Dream Color Care · Extra Volume</span>
            <h2>Extra Volume</h2>
            <p className={styles.campaignLead}>Uma novidade para complementar a rotina profissional.</p>
            <p>Shampoo em apresentação de 1 L, com diluição 1:5.</p>
            <ul className={styles.chips} aria-label="Informações do Shampoo Extra Volume">
              {extraVolumeDetails.map((detail) => <li key={detail}><span className={styles.chipLabel}>{detail}</span></li>)}
            </ul>
            <Link className={`button button--outline button--small ${styles.campaignCta}`} to={extraVolumeProduct.to}>
              Ver produto <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </article>
      </section>

      <section className={styles.discover} aria-labelledby="launches-discover-title">
        <div className="shell">
          <Reveal as="header" className={styles.discoverHeading}>
            <span className="eyebrow">Home care para tutores</span>
            <h2 id="launches-discover-title">O cuidado Atual Pet também continua em casa.</h2>
          </Reveal>

          <div className={styles.discoverGrid}>
            <Reveal as="article" className={`${styles.discoverItem} ${styles.amazonDiscover}`}>
              <Link
                className={styles.amazonBannerLink}
                to={amazonExclusiveLine.route}
                aria-label="Conhecer os kits exclusivos Atual Pet na Amazon"
              >
                <img
                  src={amazonExclusiveLine.banner.image}
                  width={amazonExclusiveLine.banner.width}
                  height={amazonExclusiveLine.banner.height}
                  loading="lazy"
                  decoding="async"
                  alt={amazonExclusiveLine.banner.alt}
                />
              </Link>
              <div className={styles.amazonDiscoverCopy}>
                <ShoppingBag size={27} strokeWidth={1.35} aria-hidden="true" />
                <span>Exclusividade Amazon</span>
                <h3>Kits home care para tutores</h3>
                <p>Sete kits com shampoo, condicionador e colônia para a rotina de cuidado de cães e gatos em casa.</p>
                <Link className="text-link" to={amazonExclusiveLine.route}>Conhecer os kits <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </Reveal>
          </div>
        </div>
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
