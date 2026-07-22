import Reveal from './Reveal'
import styles from './TechnicalCredibility.module.css'

export default function TechnicalCredibility({ content }) {
  return <section className={`${styles.section} section`} aria-labelledby="technical-credibility-title">
    <div className="shell">
      <Reveal as="header" className={styles.partnerFeature}>
        <div className={styles.partnerCopy}>
          <span className={styles.partnerEyebrow}>{content.technicalPartner.eyebrow}</span>
          <h2 id="technical-credibility-title">{content.technicalPartner.title}</h2>
          <p>{content.technicalPartner.description}</p>
        </div>
        <div className={styles.partnerBrand}>
          <img
            className={styles.partnerLogo}
            src={content.technicalPartner.logo}
            width={content.technicalPartner.logoWidth}
            height={content.technicalPartner.logoHeight}
            loading="lazy"
            decoding="async"
            alt={content.technicalPartner.logoAlt}
          />
        </div>
      </Reveal>

      <Reveal className={styles.processIntro} delay={70}>
        <span className="eyebrow">{content.eyebrow}</span>
        <p className={styles.processTitle}>{content.title}</p>
        <p className={styles.processDescription}>{content.description}</p>
      </Reveal>

      <div className={styles.process} role="list" aria-label="Processo técnico em três etapas">
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
              {item.logo
                ? <img
                  className={`${styles.stageMark} ${item.logoVariant === 'seal' ? styles.stageSeal : ''}`}
                  src={item.logo}
                  width={item.logoWidth}
                  height={item.logoHeight}
                  loading="lazy"
                  decoding="async"
                  alt={item.logoAlt}
                />
                : <svg className={styles.performanceSignal} viewBox="0 0 220 150" aria-hidden="true" focusable="false">
                  <path className={styles.signalAxis} d="M12 12v126h196" />
                  <path className={styles.signalPath} d="m30 116 56-36 47 13 58-56" />
                  <circle cx="30" cy="116" r="5" />
                  <circle cx="86" cy="80" r="5" />
                  <circle cx="133" cy="93" r="5" />
                  <circle cx="191" cy="37" r="5" />
                </svg>}
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
