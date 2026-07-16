import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import LeadForm from '../components/LeadForm'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { company } from '../data/company'
import styles from './Content.module.css'
export default function Contact(){return <><Seo title="Contato" description="Fale com a equipe Atual Pet sobre produtos, distribuição, suporte comercial e materiais." path="/contato"/><PageHero eyebrow="Contato" title="Vamos conversar sobre o que você precisa." text="Escolha o assunto e envie sua mensagem. Se o envio online ainda não estiver configurado, você poderá continuar pelo WhatsApp."/><main className={`${styles.contact} shell section`}><aside><span className="eyebrow">Canais diretos</span><h2>Fale com a Atual Pet.</h2><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp<br/>{company.phone}</a><a href={`tel:${company.whatsapp}`}><Phone/>Telefone<br/>{company.phone}</a><a href={`mailto:${company.email}`}><Mail/>E-mail<br/>{company.email}</a><span><MapPin/>{company.address}</span><small>Endereço sujeito à validação final da empresa.</small></aside><LeadForm/></main></>}
