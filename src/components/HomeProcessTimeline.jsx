import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import groomerBath from '../assets/editorial/groomer-bath.jpg'
import groomerFur from '../assets/editorial/groomer-fur.jpg'
import hygienePreparation from '../assets/home/home-process-hygiene-preparation.webp'
import styles from './HomeProcessTimeline.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const processImages = {
  products: hygienePreparation,
  bath: groomerBath,
  finish: groomerFur,
}

export default function HomeProcessTimeline({ content }) {
  const section = useRef(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const progressLine = section.current.querySelector('[data-process-progress]')
      const steps = gsap.utils.toArray('[data-process-step]', section.current)
      const pathLength = progressLine.getTotalLength()

      gsap.set(progressLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
      gsap.to(progressLine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current.querySelector('[data-process-body]'),
          start: 'top 72%',
          end: 'bottom 64%',
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })

      steps.forEach((step) => {
        const visual = step.querySelector('[data-process-visual]')
        const copy = step.querySelector('[data-process-copy]')
        const marker = step.querySelector('[data-process-marker]')

        gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 76%',
            toggleActions: 'play none none none',
          },
        })
          .fromTo(visual,
            { opacity: 0, y: 44, clipPath: 'inset(13% 0 13% 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)', duration: 0.9, ease: 'power3.out' },
          )
          .fromTo(copy,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' },
            '-=0.57',
          )
          .fromTo(marker,
            { scale: 0.45, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.46, ease: 'power2.out' },
            '-=0.62',
          )
      })
    })

    return () => media.revert()
  }, { scope: section })

  return (
    <section ref={section} className={`${styles.process} section`} aria-labelledby="home-process-title">
      <div className="shell">
        <header className={styles.heading}>
          <span className="eyebrow">{content.eyebrow}</span>
          <div>
            <h2 id="home-process-title">{content.title}</h2>
            <p>{content.description}</p>
          </div>
        </header>

        <div className={styles.body} data-process-body>
          <svg className={styles.path} viewBox="0 0 240 1800" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.pathBase} d="M120 0 C120 130 190 205 168 300 C140 425 72 485 120 600 C172 725 145 835 86 900 C30 965 62 1105 120 1200 C178 1295 178 1410 142 1500 C112 1578 114 1710 120 1800"/>
            <path data-process-progress className={styles.pathProgress} d="M120 0 C120 130 190 205 168 300 C140 425 72 485 120 600 C172 725 145 835 86 900 C30 965 62 1105 120 1200 C178 1295 178 1410 142 1500 C112 1578 114 1710 120 1800"/>
          </svg>

          <ol className={styles.steps}>
            {content.steps.map((step) => (
              <li key={step.id} className={styles.step} data-process-step>
                <figure className={styles.visual} data-process-visual>
                  <img
                    src={processImages[step.imageKey]}
                    width={step.imageWidth}
                    height={step.imageHeight}
                    loading="lazy"
                    alt={step.alt}
                  />
                </figure>

                <span className={styles.marker} data-process-marker aria-hidden="true"><i/></span>

                <div className={styles.copy} data-process-copy>
                  <span className={styles.number}>{step.number}</span>
                  <span className={styles.relation}>{step.relation}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
