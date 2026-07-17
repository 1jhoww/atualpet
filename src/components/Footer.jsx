import { ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/brand/atual-pet.png'
import { company } from '../data/company'
import { legal } from '../data/legal'
import { productLines } from '../data/productTaxonomy'
import CookieSettingsButton from './CookieSettingsButton'
import PortalCommercialButton from './PortalCommercialButton'
import Reveal from './Reveal'
import styles from './Footer.module.css'

export default function Footer() {
  const commercialLines = productLines.filter((line) => !line.supportMaterial)
  const credit = company.developerCredit
  return <footer className={styles.footer}>
    <Reveal className={`${styles.cta} shell`}>
      <div><span className="eyebrow">Próximo passo</span><h2>Encontre a linha certa para transformar o seu protocolo.</h2></div>
      <Link className="button button--light" to="/produtos">Explorar catálogo <ArrowUpRight size={18} /></Link>
    </Reveal>
    <div className={`${styles.grid} shell`}>
      <div className={styles.brand}>
        <img src={logo} alt="Atual Pet" width="170" height="112"/>
        <p>{company.legalPositioning}.</p>
        <div className={styles.social} aria-label="Redes sociais da Atual Pet"><a href={company.social.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={company.social.whatsapp.label}><FaWhatsapp size={18}/></a><a href={company.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={company.social.instagram.label}><FaInstagram size={18}/></a><a href={company.social.facebook.url} target="_blank" rel="noopener noreferrer" aria-label={company.social.facebook.label}><FaFacebookF size={16}/></a></div>
      </div>
      <div><h3>Navegação</h3><Link to="/">Início</Link><Link to="/sobre">A Atual Pet</Link><Link to="/produtos">Produtos</Link><Link to="/onde-encontrar">Onde encontrar</Link><Link to="/contato">Contato</Link></div>
      <div><h3>Linhas</h3>{commercialLines.map((line)=><Link key={line.id} to={line.route || `/produtos?linha=${line.id}`}>{line.name}</Link>)}</div>
      <div><h3>Distribuidores</h3><Link to="/seja-um-distribuidor">Seja um distribuidor</Link><PortalCommercialButton /></div>
    </div>
    <div className={`${styles.bottom} shell`}>
      <div className={styles.copyright}><span>© {new Date().getFullYear()} Atual Pet. Todos os direitos reservados.</span><small>{legal.relationship}</small></div>
      <nav aria-label="Links legais"><Link to="/politica-de-privacidade">Política de Privacidade</Link><Link to="/politica-de-cookies">Política de Cookies</Link><Link to="/termos-de-uso">Termos de Uso</Link><CookieSettingsButton /></nav>
      <div className={styles.credit} aria-label="Créditos de desenvolvimento"><span className={styles.creditLabel}>Desenvolvido por</span><a className={styles.creditLogo} href={credit.website} target="_blank" rel="noopener noreferrer" aria-label={`Site oficial da ${credit.name}`}><img src={credit.logo} alt="" width="1536" height="1024" loading="lazy"/></a><a className={styles.creditInstagram} href={credit.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram da ${credit.name}`}><FaInstagram aria-hidden="true"/></a></div>
    </div>
  </footer>
}
