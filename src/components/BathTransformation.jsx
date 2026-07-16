import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import dogCleanWebp from '../assets/home/dog-clean.webp'
import dogCleanPng from '../assets/home/dog-clean.png'
import dogDirtyWebp from '../assets/home/dog-dirty.webp'
import dogDirtyPng from '../assets/home/dog-dirty.png'
import { createBathBubbleRenderer } from './bathBubbleRenderer'
import styles from './BathTransformation.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const desktopParticles = { background: 34, middle: 28, front: 10, foam: 48 }
const mobileParticles = { background: 12, middle: 10, front: 4, foam: 20 }

export default function BathTransformation({ content }) {
  const hero = useRef(null)
  const backCanvas = useRef(null)
  const frontCanvas = useRef(null)

  useEffect(() => {
    const image = new Image()
    image.src = dogCleanWebp
    image.decode?.().then(() => ScrollTrigger.refresh()).catch(() => {})
  }, [])

  useGSAP(() => {
    const media = gsap.matchMedia()

    const createScene = ({ desktop }) => {
      const renderer = createBathBubbleRenderer(
        backCanvas.current,
        frontCanvas.current,
        desktop ? desktopParticles : mobileParticles,
      )
      const pinDistance = desktop ? 1.78 : 0.58
      const cleanDog = '[data-dog-clean]'
      const dirtyDog = '[data-dog-dirty]'
      const initialCopy = '[data-copy-initial]'
      const finalCopy = '[data-copy-final]'
      const bathTint = '[data-bath-tint]'

      gsap.set(cleanDog, { autoAlpha: 0, scale: 1.012, clipPath: 'ellipse(0% 0% at 55% 82%)' })
      gsap.set(finalCopy, { autoAlpha: 0, y: 28 })
      gsap.set(bathTint, { opacity: 0 })
      renderer.render(0)

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * pinDistance)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: desktop ? 0.72 : 0.38,
          invalidateOnRefresh: true,
          onUpdate: (self) => renderer.render(self.progress),
          onRefresh: (self) => {
            renderer.resize()
            renderer.render(self.progress)
          },
          onLeave: () => renderer.render(1),
        },
      })

      timeline
        .to(bathTint, { opacity: 0.86, duration: 0.34 }, 0.1)
        .to(initialCopy, { autoAlpha: 0.52, y: -5, duration: 0.18 }, 0.18)
        .to(initialCopy, { autoAlpha: 0, y: -22, duration: 0.2 }, 0.38)
        .to(dirtyDog, { autoAlpha: 0.04, scale: 1.012, duration: 0.27 }, 0.34)
        .to(cleanDog, { autoAlpha: 1, scale: 1, clipPath: 'ellipse(96% 112% at 55% 58%)', duration: 0.3 }, 0.39)
        .to(finalCopy, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.58)
        .to(bathTint, { opacity: 0.16, duration: 0.24 }, 0.74)

      const refresh = () => ScrollTrigger.refresh()
      const images = hero.current.querySelectorAll('img')
      images.forEach((image) => {
        if (!image.complete) image.addEventListener('load', refresh, { once: true })
      })
      window.addEventListener('resize', refresh)

      return () => {
        images.forEach((image) => image.removeEventListener('load', refresh))
        window.removeEventListener('resize', refresh)
        renderer.destroy()
      }
    }

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => createScene({ desktop: true }))
    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => createScene({ desktop: false }))

    return () => media.revert()
  }, { scope: hero })

  return (
    <div className={styles.experience}>
      <section ref={hero} className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.bathTint} data-bath-tint aria-hidden="true"/>
        <canvas ref={backCanvas} className={`${styles.canvas} ${styles.canvasBack}`} aria-hidden="true"/>

        <div className={`${styles.heroInner} shell`}>
          <div className={styles.copyStage}>
            <div className={`${styles.copy} ${styles.initialCopy}`} data-copy-initial>
              <span className="eyebrow">Marca de cosméticos profissionais para pets</span>
              <h1 id="home-hero-title">{content.initialTitle}</h1>
              <p>{content.initialDescription}</p>
              <div className={`button-row ${styles.heroActions}`}>
                <Link className="button" to="/produtos">Conheça os produtos <ArrowRight size={17}/></Link>
                <Link className={`button button--ghost ${styles.secondaryCta}`} to="/onde-encontrar">Onde encontrar</Link>
              </div>
            </div>

            <div className={`${styles.copy} ${styles.finalCopy}`} data-copy-final>
              <span className="eyebrow">Cuidado em processo</span>
              <h2>{content.finalTitle}</h2>
              <p>{content.finalDescription}</p>
              <Link className="button" to={content.finalCtaUrl}>{content.finalCtaLabel} <ArrowRight size={17}/></Link>
            </div>
          </div>

          <div className={styles.dogStage}>
            <div className={styles.dogLayer} data-dog-dirty>
              <picture>
                <source srcSet={dogDirtyWebp} type="image/webp"/>
                <img src={dogDirtyPng} width="1024" height="1536" fetchPriority="high" decoding="async" alt="Cachorro antes do cuidado durante o banho"/>
              </picture>
            </div>
            <div className={`${styles.dogLayer} ${styles.cleanDog}`} data-dog-clean>
              <picture>
                <source srcSet={dogCleanWebp} type="image/webp"/>
                <img src={dogCleanPng} width="1024" height="1536" loading="eager" decoding="async" alt="Cachorro coberto por espuma durante o banho"/>
              </picture>
            </div>
          </div>
        </div>

        <canvas ref={frontCanvas} className={`${styles.canvas} ${styles.canvasFront}`} aria-hidden="true"/>
        <div className={styles.scrollCue} aria-hidden="true">Role para transformar <ArrowDown size={16}/></div>
      </section>

      <div className={`${styles.reducedFallback} shell`}>
        <picture>
          <source srcSet={dogCleanWebp} type="image/webp"/>
          <img src={dogCleanPng} width="1024" height="1536" loading="eager" decoding="async" alt="Cachorro coberto por espuma durante o banho"/>
        </picture>
        <div>
          <span className="eyebrow">Cuidado em processo</span>
          <h2>{content.finalTitle}</h2>
          <p>{content.finalDescription}</p>
          <Link className="button" to={content.finalCtaUrl}>{content.finalCtaLabel} <ArrowRight size={17}/></Link>
        </div>
      </div>
    </div>
  )
}
