import { useContext } from 'react'
import { CookieConsentContext } from '../components/CookieConsentContext'

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (!context) throw new Error('useCookieConsent deve ser usado dentro de CookieConsentProvider.')
  return context
}
