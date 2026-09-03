import { Calculator, Handshake, Home, Mail, MapPin, PackageSearch, Star } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { company } from './company'

const portalUrl = import.meta.env.VITE_PORTAL_COMERCIAL_URL?.trim()

// Página de links da bio. Para publicar um novo atalho, campanha, lançamento,
// evento, promoção ou canal temporário, basta acrescentar um item nas listas
// abaixo: `to` para rotas internas e `href` para destinos externos.
export const linksPage = {
  seo: {
    title: 'Links da Atual Pet',
    description: 'Atalhos oficiais da Atual Pet: site institucional, catálogo de cosméticos profissionais, Calculadora do Banho, distribuidores e atendimento.',
    path: '/links',
  },
  intro: {
    eyebrow: 'Links oficiais',
    title: 'Tudo da Atual Pet em um só lugar.',
    text: 'Cosméticos profissionais para higiene, estética e perfumaria pet. Escolha por onde quer começar.',
  },
  // Destaque único do momento (campanha/inscrição temporária). Basta trocar
  // o conteúdo ou definir `highlight: null` quando a ação terminar.
  highlight: { id: 'groomer-got-talent', label: 'Inscrição Groomer Got Talent', description: 'Inscreva-se pelo formulário oficial.', href: 'https://forms.gle/AUUS4fV3nmmjmq529', icon: Star },
  // Destaques principais: no máximo dois, para preservar a hierarquia.
  featured: [
    { id: 'site', label: 'Conheça nosso site', description: 'Institucional, linhas e catálogo completo.', to: '/', icon: Home },
    { id: 'calculadora', label: 'Calculadora do Banho', description: 'Calcule o custo real de cada banho por produto.', to: '/calculadora-do-banho', icon: Calculator },
  ],
  // Campanhas, lançamentos e links temporários entram aqui e aparecem logo
  // abaixo dos destaques quando a lista deixar de estar vazia.
  campaigns: [],
  shortcuts: [
    { id: 'produtos', label: 'Conheça nossos produtos', description: 'Dream Color, The Luxe, Vanity Pet e Zoom.', to: '/produtos', icon: PackageSearch },
    { id: 'onde-encontrar', label: 'Onde encontrar', description: 'Distribuidores parceiros por estado e cidade.', to: '/onde-encontrar', icon: MapPin },
    { id: 'distribuidor', label: 'Seja um distribuidor', description: 'Leve a Atual Pet para a sua região.', to: '/seja-um-distribuidor', icon: Handshake },
    ...(portalUrl ? [{ id: 'portal', label: 'Portal Comercial', description: 'Acesso exclusivo para distribuidores.', href: portalUrl, icon: PackageSearch }] : []),
  ],
  contact: {
    title: 'Fale com a Atual Pet',
    text: 'Atendimento comercial de segunda a sexta.',
    primary: { id: 'whatsapp', label: 'Chamar no WhatsApp', description: company.phone, href: company.social.whatsapp.url, icon: FaWhatsapp },
    items: [
      { id: 'email', label: 'E-mail', description: company.administrativeEmail, href: `mailto:${company.administrativeEmail}`, icon: Mail },
      { id: 'formulario', label: 'Formulário de contato', description: 'Envie sua mensagem pelo site.', to: '/contato', icon: Mail },
    ],
  },
  social: [
    { id: 'instagram', label: 'Instagram', ariaLabel: company.social.instagram.label, href: company.social.instagram.url, icon: FaInstagram },
    { id: 'facebook', label: 'Facebook', ariaLabel: company.social.facebook.label, href: company.social.facebook.url, icon: FaFacebookF },
  ],
}
