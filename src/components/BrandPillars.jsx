import { useState } from 'react'
import styles from './BrandPillars.module.css'

const pillars = [
  {
    title: 'Precisão',
    description: 'Um portfólio pensado para apoiar protocolos profissionais com escolhas mais claras em cada etapa.',
  },
  {
    title: 'Cuidado',
    description: 'Cosméticos que integram higiene, estética e bem-estar ao ritual de banho e tosa.',
  },
  {
    title: 'Presença',
    description: 'Distribuidores parceiros aproximam os produtos da fabricante de diferentes regiões do Brasil.',
  },
  {
    title: 'Resultado',
    description: 'Linhas que acompanham o profissional da preparação ao acabamento sensorial.',
  },
]

export default function BrandPillars() {
  const [active, setActive] = useState(0)

  return <div className={styles.list}>
    {pillars.map((pillar, index) => {
      const isActive = active === index
      const descriptionId = `brand-pillar-${index}`
      return <div className={`${styles.item} ${isActive ? styles.active : ''}`} key={pillar.title}>
        <button
          type="button"
          aria-expanded={isActive}
          aria-controls={descriptionId}
          onClick={() => setActive(index)}
          onFocus={() => setActive(index)}
          onMouseEnter={() => setActive(index)}
        >
          <span>0{index + 1}</span>
          <strong>{pillar.title}</strong>
          <i aria-hidden="true">+</i>
        </button>
        <div id={descriptionId} className={styles.description} aria-hidden={!isActive}>
          <p>{pillar.description}</p>
        </div>
      </div>
    })}
  </div>
}
