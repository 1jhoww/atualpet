import { Play, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useCookieConsent } from '../hooks/useCookieConsent'
import Reveal from './Reveal'
import styles from './InstitutionalVideo.module.css'

const getYouTubeId = (url = '') => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)
  return match?.[1] || ''
}

export default function InstitutionalVideo({ video, titleAs = 'h2', opening = false }) {
  const Heading = titleAs
  const { isAllowed, openPreferences } = useCookieConsent()
  const [playerRequested, setPlayerRequested] = useState(false)
  const videoId = video?.provider === 'youtube' ? getYouTubeId(video.url) : ''
  const functionalAllowed = isAllowed('functional')
  const playerVisible = playerRequested && functionalAllowed
  const requestPlayer = () => {
    setPlayerRequested(true)
    if (!functionalAllowed) openPreferences()
  }

  if (!video?.url || !videoId) return null

  return <section className={`${styles.section} ${opening ? styles.opening : ''} section`} aria-labelledby="institutional-video-title">
    <div className="shell">
      <Reveal as="header" className={styles.heading}>
        <div><span className="eyebrow">Por dentro da Atual Pet</span><Heading id="institutional-video-title">{video.title}</Heading></div>
        <p>Conheça a atuação da marca e o cuidado por trás das linhas de cosméticos profissionais Atual Pet.</p>
      </Reveal>
      <Reveal className={styles.videoFrame} data-reveal="image">
        {playerVisible ? <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : <div className={styles.poster}>
            {video.poster && <img src={video.poster} width="1280" height="720" alt="Capa do vídeo institucional da Atual Pet" loading="lazy" />}
            <button type="button" className={styles.playButton} onClick={requestPlayer}>
              <Play fill="currentColor" aria-hidden="true" />
              <span>Assistir ao vídeo</span>
            </button>
            <p><ShieldCheck aria-hidden="true" /> O player do YouTube só será carregado com sua autorização.</p>
          </div>}
      </Reveal>
    </div>
  </section>
}
