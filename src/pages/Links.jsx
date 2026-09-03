import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/brand/atual-pet.png'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { company } from '../data/company'
import { linksPage } from '../data/links'
import styles from './Links.module.css'

const isExternal = (item) => Boolean(item.href)
// mailto: e tel: abrem no aplicativo do visitante, sem nova aba.
const opensNewTab = (item) => /^https?:/i.test(item.href || '')

function LinkTile({ item, className }) {
  const content = <>
    {item.icon && <span className={styles.tileIcon}><item.icon size={20} aria-hidden="true" /></span>}
    <span className={styles.tileText}>
      <strong>{item.label}</strong>
      {item.description && <small>{item.description}</small>}
    </span>
    <ArrowUpRight className={styles.tileArrow} size={18} aria-hidden="true" />
  </>
  return isExternal(item)
    ? <a className={className} href={item.href} {...(opensNewTab(item) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a>
    : <Link className={className} to={item.to}>{content}</Link>
}

export default function Links() {
  const { seo, intro, featured, campaigns, shortcuts, contact, social } = linksPage
  return <main className={styles.page}>
    <Seo title={seo.title} description={seo.description} path={seo.path} />
    <div className={styles.layout}>
      <Reveal as="header" className={styles.intro}>
        <img src={logo} width="170" height="112" alt="Atual Pet" />
        <span className="eyebrow">{intro.eyebrow}</span>
        <h1>{intro.title}</h1>
        <p>{intro.text}</p>
      </Reveal>

      <div className={styles.content}>
        <Reveal as="section" className={styles.featured} aria-label="Destaques">
          {featured.map((item) => <LinkTile key={item.id} item={item} className={`${styles.tile} ${styles.tileFeatured}`} />)}
        </Reveal>

        {campaigns.length > 0 && <Reveal as="section" className={styles.group} delay={40} aria-label="Em destaque agora">
          <h2 className={styles.groupTitle}>Em destaque agora</h2>
          {campaigns.map((item) => <LinkTile key={item.id} item={item} className={`${styles.tile} ${styles.tileCampaign}`} />)}
        </Reveal>}

        <Reveal as="section" className={styles.group} delay={60} aria-label="Atalhos">
          <h2 className={styles.groupTitle}>Atalhos</h2>
          {shortcuts.map((item) => <LinkTile key={item.id} item={item} className={styles.tile} />)}
        </Reveal>

        <Reveal as="section" className={styles.contact} delay={90} aria-labelledby="links-contact-title">
          <h2 id="links-contact-title">{contact.title}</h2>
          <p>{contact.text}</p>
          <LinkTile item={contact.primary} className={`${styles.tile} ${styles.tileContact}`} />
          <div className={styles.contactRow}>
            {contact.items.map((item) => <LinkTile key={item.id} item={item} className={`${styles.tile} ${styles.tileCompact}`} />)}
          </div>
        </Reveal>

        <Reveal as="section" className={styles.socialBlock} delay={110} aria-label="Redes sociais da Atual Pet">
          <span className={styles.socialLabel}>Siga a Atual Pet</span>
          <div className={styles.socialRow}>
            {social.map((item) => <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel}>
              <item.icon aria-hidden="true" /><span>{item.label}</span>
            </a>)}
          </div>
        </Reveal>
      </div>
    </div>

    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} {company.name}</span>
      <Link to="/politica-de-privacidade">Política de Privacidade</Link>
    </footer>
  </main>
}
