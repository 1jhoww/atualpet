import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { legal } from '../data/legal'
import { useCookieConsent } from '../hooks/useCookieConsent'
import styles from './CookieConsent.module.css'

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function CookiePreferencesModal() {
  const { preferences, acceptAll, rejectNonNecessary, savePreferences, closePreferences } = useCookieConsent()
  const [functional, setFunctional] = useState(preferences.functional)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const focusable = [...dialog.querySelectorAll(focusableSelector)]
    focusable[0]?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closePreferences(); return }
      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    dialog.addEventListener('keydown', onKeyDown)
    return () => dialog.removeEventListener('keydown', onKeyDown)
  }, [closePreferences])

  return <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePreferences() }}>
    <section ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description">
      <header>
        <div><span className="eyebrow">Privacidade</span><h2 id="cookie-preferences-title">Preferências de cookies</h2></div>
        <button type="button" className={styles.close} onClick={closePreferences} aria-label="Fechar preferências de cookies"><X aria-hidden="true" /></button>
      </header>
      <p id="cookie-preferences-description">Escolha se o site pode carregar recursos funcionais de terceiros. Você pode alterar esta decisão quando quiser.</p>
      <div className={styles.categories}>
        {legal.cookieCategories.map((category) => <div className={styles.category} key={category.id}>
          <div><strong>{category.name}</strong><p>{category.description}</p></div>
          {category.required
            ? <span className={styles.alwaysOn}>Sempre ativo</span>
            : <label className={styles.switch}><span>Permitir {category.name.toLowerCase()}</span><input type="checkbox" checked={functional} onChange={(event) => setFunctional(event.target.checked)} /><i aria-hidden="true" /></label>}
        </div>)}
      </div>
      <div className={styles.modalActions}>
        <button type="button" className={styles.secondary} onClick={rejectNonNecessary}>Rejeitar não necessários</button>
        <button type="button" className={styles.secondary} onClick={acceptAll}>Aceitar todos</button>
        <button type="button" className={styles.primary} onClick={() => savePreferences({ functional })}>Salvar preferências</button>
      </div>
    </section>
  </div>
}
