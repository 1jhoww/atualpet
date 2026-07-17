import { useRef, useState } from 'react'
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../data/legal'
import CookieBanner from './CookieBanner'
import { CookieConsentContext } from './CookieConsentContext'
import CookiePreferencesModal from './CookiePreferencesModal'

const defaults = { version: CONSENT_VERSION, necessary: true, functional: false }

const readStoredConsent = () => {
  if (typeof window === 'undefined') return null
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY))
    if (parsed?.version !== CONSENT_VERSION || parsed.necessary !== true) return null
    return { ...defaults, functional: parsed.functional === true, updatedAt: parsed.updatedAt }
  } catch {
    return null
  }
}

export default function CookieConsentProvider({ children }) {
  const [initial] = useState(() => readStoredConsent())
  const [preferences, setPreferences] = useState(initial || defaults)
  const [hasDecision, setHasDecision] = useState(Boolean(initial))
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const returnFocusRef = useRef(null)

  const persist = (next) => {
    const stored = { ...defaults, ...next, necessary: true, updatedAt: new Date().toISOString() }
    setPreferences(stored)
    setHasDecision(true)
    try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored)) } catch { /* Preferência mantida apenas em memória. */ }
    return stored
  }

  const acceptAll = () => { persist({ functional: true }); setPreferencesOpen(false) }
  const rejectNonNecessary = () => { persist({ functional: false }); setPreferencesOpen(false) }
  const savePreferences = (next) => { persist(next); setPreferencesOpen(false) }
  const openPreferences = () => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setPreferencesOpen(true)
  }
  const closePreferences = () => {
    setPreferencesOpen(false)
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }
  const isAllowed = (category) => category === 'necessary' || preferences[category] === true
  const value = { preferences, hasDecision, acceptAll, rejectNonNecessary, savePreferences, openPreferences, closePreferences, isAllowed }

  return <CookieConsentContext.Provider value={value}>
    {children}
    {!hasDecision && <CookieBanner />}
    {preferencesOpen && <CookiePreferencesModal />}
  </CookieConsentContext.Provider>
}
