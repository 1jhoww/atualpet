import Reveal from './Reveal'
import styles from './TechnicalCredibility.module.css'

export default function TechnicalCredibility({ content }) {
  return <section className={`${styles.section} section`} aria-labelledby="technical-credibility-title">
    <div className="shell">
      <Reveal as="header" className={styles.heading}>
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="technical-credibility-title">{content.title}</h2>
        </div>
        <p>{content.description}</p>
      </Reveal>

      <Reveal className={styles.body} delay={70}>
        <article className={styles.partnerFeature}>
          <div className={styles.partnerCopy}>
            <span>{content.technicalPartner.eyebrow}</span>
            <h3>{content.technicalPartner.title}</h3>
          </div>
          <div className={styles.partnerIdentity}>
            <img
              className={styles.partnerLogo}
              src={content.technicalPartner.logo}
              width={content.technicalPartner.logoWidth}
              height={content.technicalPartner.logoHeight}
              loading="lazy"
              decoding="async"
              alt="Kosmoscience"
            />
            <p>{content.technicalPartner.description}</p>
          </div>
        </article>

        <div className={styles.evidenceRail}>
          {content.evidence.map((item) => <article className={`${styles.evidence} ${item.featured ? styles.evidenceFeatured : ''}`} key={item.id}>
            <div className={styles.evidenceMeta}>
              <span>{item.eyebrow}</span>
              <span aria-hidden="true">{item.number}</span>
            </div>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
          </article>)}
        </div>
      </Reveal>
    </div>
  </section>
}
