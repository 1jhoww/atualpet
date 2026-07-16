import { MapPin, MessageCircle, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { distributors } from '../data/distributors'
import { catalogService } from '../services/catalogService'
import styles from './Distributors.module.css'

export default function Distributors() {
  const [filters,setFilters]=useState({search:'',state:'',region:''})
  const results=useMemo(()=>catalogService.searchDistributors(filters).sort((a,b)=>a.state.localeCompare(b.state)||a.name.localeCompare(b.name)),[filters])
  const states=[...new Set(distributors.map(d=>d.state))].sort()
  const set=(key,value)=>setFilters({...filters,[key]:value})
  return <>
    <Seo title="Onde encontrar" description="Localize distribuidores parceiros que comercializam produtos fabricados pela Atual Pet." path="/onde-encontrar"/>
    <PageHero eyebrow="Distribuidores parceiros" title="Encontre Atual Pet na sua região." text="A Atual Pet fabrica seus cosméticos e conta com distribuidores parceiros para atender diferentes regiões."/>
    <main className={`${styles.page} shell section`}>
      <aside><h2>Refine a busca</h2><label>Nome ou cidade<div><Search size={16}/><input value={filters.search} onChange={e=>set('search',e.target.value)} placeholder="Ex.: São Paulo"/></div></label><label>Estado<select value={filters.state} onChange={e=>set('state',e.target.value)}><option value="">Todos</option>{states.map(s=><option key={s}>{s}</option>)}</select></label><label>Região<select value={filters.region} onChange={e=>set('region',e.target.value)}><option value="">Todas</option><option>Sudeste</option><option>Sul</option><option>Centro-Oeste</option><option>Nordeste</option><option>Norte</option></select></label><button className="text-link" onClick={()=>setFilters({search:'',state:'',region:''})}>Limpar filtros</button></aside>
      <section><p className={styles.count}><strong>{results.length}</strong> distribuidores parceiros encontrados</p>{results.length?<div className={styles.list}>{results.map(item=><article key={item.id}><div><span>{item.state} · {item.city}</span><h3>{item.name}</h3>{item.notes&&<p>{item.notes}</p>}</div><div className={styles.cardActions}><span>{item.phone}</span>{item.whatsapp&&<a className="button button--small" href={`https://wa.me/${item.whatsapp}?text=${encodeURIComponent('Olá, encontrei seu contato no site da Atual Pet e gostaria de informações sobre os produtos.')}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>}</div></article>)}</div>:<EmptyState title="Nenhum distribuidor parceiro localizado" text="Tente outra cidade ou remova um dos filtros."/>}</section>
    </main>
    <section className={`${styles.ctas} shell section`}><div><MapPin/><h2>Já é distribuidor parceiro e não aparece?</h2><p>Envie os dados atualizados para análise da fabricante.</p><Link className="button button--outline" to="/contato">Solicitar atualização</Link></div><div><h2>Quer distribuir Atual Pet?</h2><p>Conte sobre sua empresa, experiência e região atendida. A candidatura será analisada pela equipe comercial.</p><Link className="button" to="/seja-um-distribuidor">Conhecer a parceria</Link></div></section>
  </>
}
