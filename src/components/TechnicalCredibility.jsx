import Reveal from './Reveal'
import styles from './TechnicalCredibility.module.css'

export default function TechnicalCredibility({ content }) {
  return <section className={`${styles.section} section`} aria-labelledby="technical-credibility-title">
    <div className="shell">
      <Reveal as="header" className={styles.brandFeature}>
        <div className={styles.brandCopy}>
          <span className={styles.brandEyebrow}>{content.institutionalLead.eyebrow}</span>
          <h2 id="technical-credibility-title">{content.institutionalLead.title}</h2>
          <p>{content.institutionalLead.description}</p>
        </div>
        <div className={styles.brandMark}>
          <img
            className={styles.brandLogo}
            src={content.institutionalLead.logo}
            width={content.institutionalLead.logoWidth}
            height={content.institutionalLead.logoHeight}
            loading="lazy"
            decoding="async"
            alt={content.institutionalLead.logoAlt}
          />
        </div>
      </Reveal>

      <Reveal className={styles.processIntro} delay={70}>
        <span className="eyebrow">{content.eyebrow}</span>
        <p className={styles.processTitle}>{content.title}</p>
        <p className={styles.processDescription}>{content.description}</p>
      </Reveal>

      <div className={styles.process} role="list" aria-label="Processo institucional em três etapas">
        {content.evidence.map((item, index) => <div className={styles.processItem} key={item.id}>
          <Reveal
            as="article"
            className={styles.stage}
            delay={140 + (index * 90)}
            role="listitem"
          >
            <header className={styles.stageHeader}>
              <span className={styles.stageNumber} aria-hidden="true">{item.number}</span>
              <span className={styles.stageLabel}>{item.eyebrow}</span>
            </header>

            <div className={styles.stageVisual}>
              <span className={styles.stageWord} aria-hidden="true">{item.visualLabel}</span>
            </div>

            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
          </Reveal>

          {index < content.evidence.length - 1 && <span className={styles.connector} aria-hidden="true" />}
        </div>)}
      </div>
    </div>
  </section>
}
