import { ArrowLeft, ExternalLink, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import amazonPurchaseBanner from '../assets/lancamentos/amazon/amazon-purchase-banner.jpeg'
import Breadcrumbs from '../components/Breadcrumbs'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { amazonExclusiveLine as line } from '../data/amazonExclusive'
import styles from './AmazonExclusive.module.css'

const kits = [...line.products].sort((a, b) => a.order - b.order)

export default function AmazonExclusive() {
  return <>
    <Seo
      title="Linha exclusiva Amazon | Atual Pet"
      description="Conheça os sete kits home care da Atual Pet para tutores, disponíveis exclusivamente na Amazon."
      path={line.route}
    />

    <main className={styles.page}>
      <section className={styles.introduction} aria-labelledby="amazon-exclusive-title">
        <div className="shell">
          <Reveal className={styles.heroTop}>
            <Breadcrumbs items={[{ label: 'Lançamentos', to: '/lancamentos' }, { label: 'Linha exclusiva Amazon' }]} />
          </Reveal>

          <div className={styles.introductionInner}>
            <Reveal className={styles.introductionCopy}>
              <span className="eyebrow">{line.eyebrow}</span>
              <h1 id="amazon-exclusive-title">Home Care Exclusiva da Amazon</h1>
              <h2>{line.title}</h2>
              <p>{line.description}</p>
            </Reveal>

            <Reveal className={styles.purchaseNote} delay={80}>
              <ShoppingBag size={28} strokeWidth={1.35} aria-hidden="true" />
              <strong>{kits.length} kits home care</strong>
              <span>Para tutores, com compra realizada no site da Amazon</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.hero} aria-label="Compre os produtos exclusivos Atual Pet na Amazon">
        <div className="shell">
          <Reveal className={styles.heroMedia} delay={70} data-reveal="image">
            <img
              src={amazonPurchaseBanner}
              width="2560"
              height="1066"
              loading="lazy"
              decoding="async"
              alt="Conheça os produtos exclusivos Atual Pet na Amazon: escolha no site e receba em casa"
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.products} aria-labelledby="amazon-products-title">
        <div className="shell">
          <Reveal as="header" className={styles.sectionHeading}>
            <div>
              <span className="eyebrow">Portfólio exclusivo</span>
              <h2 id="amazon-products-title">Escolha seu kit para cuidar em casa.</h2>
            </div>
            <p>Cada kit possui uma página oficial de compra na Amazon.</p>
          </Reveal>

          <div className={styles.productGrid}>
            {kits.map((kit, index) => (
              <Reveal as="article" className={styles.product} delay={(index % 3) * 60} key={kit.id}>
                <div className={styles.productMedia}>
                  <img
                    src={kit.image}
                    width={kit.imageWidth}
                    height={kit.imageHeight}
                    loading="lazy"
                    decoding="async"
                    alt={kit.alt}
                  />
                </div>
                <div className={styles.productBody}>
                  <span>Kit exclusivo</span>
                  <h3>{kit.name}</h3>
                  <a
                    className={`button ${styles.buyButton}`}
                    href={kit.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${kit.title} na Amazon`}
                  >
                    Comprar na Amazon <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.backRow}>
            <Link className={styles.backLink} to="/lancamentos">
              <ArrowLeft size={16} aria-hidden="true" /> Voltar para Lançamentos
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  </>
}
