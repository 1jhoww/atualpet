import { Play } from 'lucide-react'
import Reveal from './Reveal'
import styles from './InstitutionalVideo.module.css'

const getYouTubeId = (url = '') => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)
  return match?.[1] || ''
}

export default function InstitutionalVideo({ video }) {
  if (!video?.url) return null
  const videoId = video.provider === 'youtube' ? getYouTubeId(video.url) : ''
  if (!videoId) return null

  return <section className={`${styles.section} section`} aria-labelledby="institutional-video-title">
    <div className="shell">
      <Reveal as="header" className={styles.heading}>
        <div><span className="eyebrow">Por dentro da Atual Pet</span><h2 id="institutional-video-title">{video.title}</h2></div>
        <p>Conheça a atuação da fabricante e o cuidado por trás das linhas de cosméticos profissionais Atual Pet.</p>
      </Reveal>
      <Reveal className={styles.videoFrame} data-reveal="image">
        <div className={styles.playLabel} aria-hidden="true"><Play fill="currentColor" size={18} /> Vídeo institucional</div>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Reveal>
    </div>
  </section>
}
