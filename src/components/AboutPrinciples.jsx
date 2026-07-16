import { useEffect, useRef, useState } from 'react'
import styles from './AboutPrinciples.module.css'

function PrincipleContent({ item }) {
  if (item.type === 'values') return <>
    <p className={styles.valuesIntro}>{item.description}</p>
    <ol className={styles.values}>{item.items.map((value, index) => <li key={value.title}>
      <span>0{index + 1}</span>
      <div><h4>{value.title}</h4><p>{value.description}</p></div>
    </li>)}</ol>
  </>
  return <p className={styles.statement}>{item.description}</p>
}

export default function AboutPrinciples({ content }) {
  const [activeId, setActiveId] = useState(content.items[0].id)
  const tabs = useRef([])
  const activeItem = content.items.find((item) => item.id === activeId)

  useEffect(() => {
    content.items.forEach((item) => {
      const image = new Image()
      image.src = item.image
      image.decode?.().catch(() => {})
    })
  }, [content.items])

  const handleTabKeyDown = (event, index) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let nextIndex
    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = content.items.length - 1
    else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % content.items.length
    else nextIndex = (index - 1 + content.items.length) % content.items.length

    setActiveId(content.items[nextIndex].id)
    tabs.current[nextIndex]?.focus()
  }

  return <section className={`${styles.section} section`} aria-labelledby="about-principles-title">
    <div className="shell">
      <header className={styles.heading}>
        <span className="eyebrow">{content.eyebrow}</span>
        <div>
          <h2 id="about-principles-title">{content.title}</h2>
          <p>{content.description}</p>
        </div>
      </header>

      <div className={styles.desktopExperience}>
        <div className={styles.tabs} role="tablist" aria-label="Missão, visão e valores">
          {content.items.map((item, index) => <button
            key={item.id}
            ref={(element) => { tabs.current[index] = element }}
            id={`about-principle-tab-${item.id}`}
            className={activeId === item.id ? styles.activeTab : ''}
            type="button"
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls="about-principle-panel"
            tabIndex={activeId === item.id ? 0 : -1}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          ><span>{item.number}</span>{item.title}</button>)}
        </div>

        <div id="about-principle-panel" className={`${styles.panel} ${activeItem.type === 'values' ? styles.valuesPanel : ''}`} data-principle={activeItem.id} role="tabpanel" aria-labelledby={`about-principle-tab-${activeItem.id}`}>
          <div key={activeItem.id} className={styles.panelScene}>
            <figure><img src={activeItem.image} width={activeItem.imageWidth} height={activeItem.imageHeight} loading="eager" decoding="async" alt={activeItem.imageAlt}/></figure>
            <div className={styles.panelCopy}>
              <span>{activeItem.number} — {activeItem.title}</span>
              <h3>{activeItem.title}</h3>
              <PrincipleContent item={activeItem}/>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileAccordion}>
        {content.items.map((item) => <div key={item.id} className={styles.accordionItem}>
          <button id={`about-accordion-button-${item.id}`} type="button" aria-expanded={activeId === item.id} aria-controls={`about-accordion-${item.id}`} onClick={() => setActiveId(item.id)}>
            <span>{item.number}</span><strong>{item.title}</strong><i aria-hidden="true">{activeId === item.id ? '−' : '+'}</i>
          </button>
          {activeId === item.id && <div id={`about-accordion-${item.id}`} className={`${styles.accordionPanel} ${item.type === 'values' ? styles.accordionValues : ''}`} data-principle={item.id} role="region" aria-labelledby={`about-accordion-button-${item.id}`}>
            <PrincipleContent item={item}/>
            <img src={item.image} width={item.imageWidth} height={item.imageHeight} loading="eager" decoding="async" alt={item.imageAlt}/>
          </div>}
        </div>)}
      </div>
    </div>
  </section>
}
