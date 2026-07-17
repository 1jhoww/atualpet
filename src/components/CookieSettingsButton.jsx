import { useCookieConsent } from '../hooks/useCookieConsent'

export default function CookieSettingsButton({ className = '' }) {
  const { openPreferences } = useCookieConsent()
  return <button type="button" className={className} onClick={openPreferences}>Gerenciar cookies</button>
}
