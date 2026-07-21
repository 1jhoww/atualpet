import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/brand/atual-pet.png'
import styles from './Header.module.css'

const navItems = [
  ['Início', '/'],
  ['Sobre', '/sobre'],
  ['Produtos', '/produtos'],
  ['Lançamentos', '/lancamentos'],
  ['Onde encontrar', '/onde-encontrar'],
  ['Contato', '/contato'],
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open])

  const navClass = ({ isActive }) => isActive ? styles.active : undefined
  return <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
    <div className={`${styles.inner} shell`}>
      <NavLink to="/" className={styles.logo} aria-label="Atual Pet — página inicial">
        <img src={logo} width="146" height="96" alt="Atual Pet" />
      </NavLink>
      <nav className={styles.desktop} aria-label="Navegação principal">
        {navItems.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} className={navClass}>{label}</NavLink>)}
      </nav>
      <NavLink className={`button button--small ${styles.distributorCta}`} to="/seja-um-distribuidor">Seja um distribuidor</NavLink>
      <button className={styles.menuButton} onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></button>
    </div>

    <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open} inert={!open} onClick={(event) => { if (event.target.closest('a')) setOpen(false) }}>
      <div className={styles.mobileTop}>
        <img src={logo} alt="Atual Pet" width="130" height="86" />
        <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button>
      </div>
      <nav aria-label="Navegação mobile">
        {navItems.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
      </nav>
      <NavLink className="button" to="/seja-um-distribuidor">Seja um distribuidor</NavLink>
    </div>
  </header>
}
