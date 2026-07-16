import { ArrowUpRight, Camera, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/brand/atual-pet.png'
import { company } from '../data/company'
import { lines } from '../data/lines'
import PortalCommercialButton from './PortalCommercialButton'
import Reveal from './Reveal'
import styles from './Footer.module.css'

export default function Footer() {
  return <footer className={styles.footer}>
    <Reveal className={`${styles.cta} shell`}>
      <div><span className="eyebrow">Próximo passo</span><h2>Encontre a linha certa para transformar o seu protocolo.</h2></div>
      <Link className="button button--light" to="/produtos">Explorar catálogo <ArrowUpRight size={18} /></Link>
    </Reveal>
    <div className={`${styles.grid} shell`}>
      <div className={styles.brand}>
        <img src={logo} alt="Atual Pet" width="170" height="112"/>
        <p>Fabricante brasileira de cosméticos profissionais para higiene, estética e cuidado animal.</p>
      </div>
      <div><h3>Institucional</h3><Link to="/sobre">A Atual Pet</Link><Link to="/materiais">Materiais</Link><Link to="/politica-de-privacidade">Privacidade</Link></div>
      <div><h3>Produtos</h3><Link to="/produtos">Catálogo</Link><Link to="/onde-encontrar">Onde encontrar</Link></div>
      <div><h3>Linhas</h3>{lines.map(line=><Link key={line.slug} to={`/linhas/${line.slug}`}>{line.name}</Link>)}</div>
      <div><h3>Distribuidores</h3><Link to="/seja-um-distribuidor">Seja um distribuidor</Link><PortalCommercialButton /></div>
      <div className={styles.contact}><h3>Contato e redes</h3><a href={`tel:${company.whatsapp}`}><Phone size={15}/>{company.phone}</a><a href={`mailto:${company.email}`}><Mail size={15}/>{company.email}</a><span><MapPin size={15}/>{company.address}</span><div className={styles.social}><a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram da Atual Pet"><Camera size={18}/></a><a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook da Atual Pet"><ExternalLink size={18}/></a></div></div>
    </div>
    <div className={`${styles.bottom} shell`}><span>© {new Date().getFullYear()} Atual Pet.</span><span>Cosméticos profissionais para pets.</span></div>
  </footer>
}
