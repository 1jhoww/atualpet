import { Link } from 'react-router-dom'
import { useCookieConsent } from '../hooks/useCookieConsent'
import styles from './CookieConsent.module.css'

export default function CookieBanner() {
  const { acceptAll, rejectNonNecessary, openPreferences } = useCookieConsent()
  return <section className={styles.banner} aria-labelledby="cookie-banner-title" aria-live="polite">
    <div className={styles.bannerCopy}>
      <strong id="cookie-banner-title">Sua privacidade, sua escolha.</strong>
      <p>Usamos armazenamento necessário para lembrar sua decisão. O vídeo do YouTube só é carregado com sua autorização. <Link to="/politica-de-cookies">Política de Cookies</Link></p>
    </div>
    <div className={styles.bannerActions}>
      <button type="button" className={styles.secondary} onClick={rejectNonNecessary}>Rejeitar não necessários</button>
      <button type="button" className={styles.secondary} onClick={openPreferences}>Gerenciar preferências</button>
      <button type="button" className={styles.primary} onClick={acceptAll}>Aceitar todos</button>
    </div>
  </section>
}
