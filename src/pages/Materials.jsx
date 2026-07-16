import { FileText } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { materials } from '../data/materials'
export default function Materials(){return <><Seo title="Materiais" description="Catálogos, fichas técnicas e materiais oficiais da Atual Pet." path="/materiais"/><PageHero eyebrow="Biblioteca da marca" title="Informação para consultar e compartilhar." text="Este espaço receberá catálogos, fichas técnicas, guias e documentos oficiais."/><main className="shell section">{materials.length?<div className="material-grid">{materials.map(item=><article key={item.id}><FileText/><span>{item.type}</span><h2>{item.title}</h2><a className="button button--outline" href={item.url}>Visualizar</a></article>)}</div>:<EmptyState title="Materiais em preparação" text="Nenhum arquivo oficial foi cadastrado. PDFs fictícios não são exibidos."/>}</main></>}
