import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
export default function NotFound(){return <main className="not-found"><Seo title="Página não encontrada" description="A página solicitada não foi encontrada."/><span>404</span><h1>Esta página saiu do roteiro.</h1><p>Volte ao início ou explore o catálogo Atual Pet.</p><Link className="button" to="/"><ArrowLeft size={17}/> Voltar ao início</Link></main>}
