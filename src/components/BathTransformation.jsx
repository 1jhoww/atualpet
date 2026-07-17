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
const desktopPinDistance = 0.68
const mobileAnimationDuration = 1.4
const safeInitializationTimeout = 2400

const emptyRenderer = {
  render() {},
  resize() {},
  destroy() {},
}

const prefersSimplifiedExperience = () => {
  const memory = Number(navigator.deviceMemory)
  const cores = Number(navigator.hardwareConcurrency)
  const lowMemory = Number.isFinite(memory) && memory > 0 && memory <= 2
  const lowConcurrency = Number.isFinite(cores) && cores > 0 && cores <= 2

  return lowConcurrency || (lowMemory && (!Number.isFinite(cores) || cores <= 4))
}

const readMobileViewport = () => ({
  width: Math.round(window.visualViewport?.width ?? document.documentElement.clientWidth ?? window.innerWidth),
  height: Math.round(window.visualViewport?.height ?? window.innerHeight),
  orientation: window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape',
})

export default function BathTransformation({ content }) {
  const experience = useRef(null)
  const hero = useRef(null)
  const backCanvas = useRef(null)
  const frontCanvas = useRef(null)

  useEffect(() => {
    let active = true
    const fallbackTimer = window.setTimeout(() => {
      if (hero.current?.dataset.bathReady !== 'true') hero.current.dataset.bathMode = 'static'
    }, safeInitializationTimeout)
    const decodes = [dogDirtyWebp, dogCleanWebp].map((source) => {
      const image = new Image()
      image.src = source
      return image.decode?.() ?? Promise.resolve()
    })

    Promise.allSettled(decodes).then(() => {
      if (active) ScrollTrigger.refresh()
    })

    return () => {
      active = false
      window.clearTimeout(fallbackTimer)
    }
  }, [])

  const handleDogImageError = (event, fallbackSource, variant) => {
    const image = event.currentTarget
    if (image.dataset.fallbackAttempted !== 'true') {
      image.dataset.fallbackAttempted = 'true'
      image.parentElement?.querySelector('source')?.remove()
      image.src = fallbackSource
      return
    }

    const failedImages = new Set(hero.current?.dataset.imageFailures?.split(' ').filter(Boolean))
    failedImages.add(variant)
    hero.current.dataset.imageFailures = [...failedImages].join(' ')
    hero.current.dataset.bathMode = 'static'
  }

  useGSAP(() => {
    const media = gsap.matchMedia()

    const createScene = ({ desktop }) => {
      let mobileViewport = desktop ? null : readMobileViewport()
      let stableStageHeight = desktop ? 0 : Math.max(
        mobileViewport.height,
        Number.parseFloat(window.getComputedStyle(hero.current).minHeight) || 0,
      )

      const applyMobileGeometry = (nextViewport = readMobileViewport()) => {
        mobileViewport = nextViewport
        stableStageHeight = Math.max(
          nextViewport.height,
          Number.parseFloat(window.getComputedStyle(hero.current).minHeight) || 0,
        )
        experience.current.style.setProperty('--mobile-stage-height', `${stableStageHeight}px`)
      }

      if (!desktop) applyMobileGeometry(mobileViewport)

      let simplified = prefersSimplifiedExperience()
      let renderer = emptyRenderer

      if (!simplified) {
        try {
          renderer = createBathBubbleRenderer(
            backCanvas.current,
            frontCanvas.current,
            desktop ? desktopParticles : mobileParticles,
            { maxDpr: desktop ? 2 : 1.25 },
          )
        } catch {
          simplified = true
          renderer = emptyRenderer
        }
      }

      hero.current.dataset.bathMode = simplified ? 'simplified' : 'enhanced'
      const cleanDog = '[data-dog-clean]'
      const dirtyDog = '[data-dog-dirty]'
      const initialCopy = '[data-copy-initial]'
      const finalCopy = '[data-copy-final]'
      const bathTint = '[data-bath-tint]'

      gsap.set(cleanDog, { autoAlpha: 0, scale: 1.012, clipPath: 'ellipse(0% 0% at 55% 82%)' })
      gsap.set(finalCopy, { autoAlpha: 0, y: 28 })
      gsap.set(bathTint, { opacity: 0 })
      renderer.render(0)

      const createTimeline = ({ paused = false, scrollTrigger, durationScale = 1 } = {}) => {
        const renderState = { progress: 0 }
        const timeline = gsap.timeline({
          paused,
          defaults: { ease: 'none' },
          ...(scrollTrigger ? { scrollTrigger } : {}),
          onComplete: () => renderer.render(1),
        })

        timeline
          .to(renderState, { progress: 1, duration: durationScale, onUpdate: () => renderer.render(renderState.progress) }, 0)
          .to(bathTint, { opacity: 0.86, duration: 0.34 * durationScale }, 0.1 * durationScale)
          .to(initialCopy, { autoAlpha: 0.52, y: -5, duration: 0.18 * durationScale }, 0.18 * durationScale)
          .to(initialCopy, { autoAlpha: 0, y: -22, duration: 0.2 * durationScale }, 0.38 * durationScale)
          .to(dirtyDog, { autoAlpha: 0.04, scale: 1.012, duration: 0.27 * durationScale }, 0.34 * durationScale)
          .to(cleanDog, { autoAlpha: 1, scale: 1, clipPath: 'ellipse(96% 112% at 55% 58%)', duration: 0.3 * durationScale }, 0.39 * durationScale)
          .to(finalCopy, { autoAlpha: 1, y: 0, duration: 0.22 * durationScale }, 0.58 * durationScale)
          .to(bathTint, { opacity: 0.16, duration: 0.24 * durationScale }, 0.74 * durationScale)

        return timeline
      }

      if (desktop && !simplified) {
        createTimeline({
          scrollTrigger: {
            trigger: hero.current,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * desktopPinDistance)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.46,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              renderer.resize()
              renderer.render(self.progress)
            },
            onLeave: () => renderer.render(1),
          },
        })
      } else {
        const timeline = createTimeline({
          paused: true,
          durationScale: simplified ? 1.05 : mobileAnimationDuration,
        })

        ScrollTrigger.create({
          trigger: hero.current,
          start: 'top top-=16',
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => timeline.play(),
          onRefresh: () => renderer.resize(),
        })
      }

      hero.current.dataset.bathReady = 'true'

      const refresh = () => ScrollTrigger.refresh()
      const images = hero.current.querySelectorAll('img')
      images.forEach((image) => {
        if (!image.complete) image.addEventListener('load', refresh, { once: true })
      })

      let resizeFrame = 0
      let orientationTimer = 0
      const handleMobileResize = () => {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame)
        resizeFrame = window.requestAnimationFrame(() => {
          resizeFrame = 0
          const nextViewport = readMobileViewport()
          const widthChanged = Math.abs(nextViewport.width - mobileViewport.width) > 2
          const orientationChanged = nextViewport.orientation !== mobileViewport.orientation

          if (!widthChanged && !orientationChanged) return
          applyMobileGeometry(nextViewport)
          ScrollTrigger.refresh()
        })
      }
      const handleOrientationChange = () => {
        window.clearTimeout(orientationTimer)
        orientationTimer = window.setTimeout(() => {
          applyMobileGeometry()
          ScrollTrigger.refresh()
        }, 240)
      }

      if (desktop) {
        window.addEventListener('resize', refresh)
      } else {
        window.addEventListener('resize', handleMobileResize, { passive: true })
        window.addEventListener('orientationchange', handleOrientationChange, { passive: true })
        window.visualViewport?.addEventListener('resize', handleMobileResize, { passive: true })
      }

      return () => {
        images.forEach((image) => image.removeEventListener('load', refresh))
        if (desktop) {
          window.removeEventListener('resize', refresh)
        } else {
          window.removeEventListener('resize', handleMobileResize)
          window.removeEventListener('orientationchange', handleOrientationChange)
          window.visualViewport?.removeEventListener('resize', handleMobileResize)
          if (resizeFrame) window.cancelAnimationFrame(resizeFrame)
          window.clearTimeout(orientationTimer)
          experience.current?.style.removeProperty('--mobile-stage-height')
        }
        renderer.destroy()
      }
    }

    const safelyCreateScene = (options) => {
      try {
        return createScene(options)
      } catch {
        hero.current.dataset.bathMode = 'static'
        hero.current.dataset.bathReady = 'true'
        return undefined
      }
    }

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => safelyCreateScene({ desktop: true }))
    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => safelyCreateScene({ desktop: false }))
    media.add('(prefers-reduced-motion: reduce)', () => {
      hero.current.dataset.bathMode = 'static'
      hero.current.dataset.bathReady = 'true'
    })

    return () => media.revert()
  }, { scope: hero })

  return (
    <div ref={experience} className={styles.experience}>
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
                <img src={dogDirtyPng} width="1024" height="1536" fetchPriority="high" decoding="async" onError={(event) => handleDogImageError(event, dogDirtyPng, 'dirty')} alt="Cachorro antes do cuidado durante o banho"/>
              </picture>
            </div>
            <div className={`${styles.dogLayer} ${styles.cleanDog}`} data-dog-clean>
              <picture>
                <source srcSet={dogCleanWebp} type="image/webp"/>
                <img src={dogCleanPng} width="1024" height="1536" loading="eager" decoding="async" onError={(event) => handleDogImageError(event, dogCleanPng, 'clean')} alt="Cachorro coberto por espuma durante o banho"/>
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
          <h1>{content.finalTitle}</h1>
          <p>{content.finalDescription}</p>
          <Link className="button" to={content.finalCtaUrl}>{content.finalCtaLabel} <ArrowRight size={17}/></Link>
        </div>
      </div>
    </div>
  )
}
