import { MapPin, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { distributors } from '../data/distributors'
import { catalogService } from '../services/catalogService'
import styles from './Distributors.module.css'

const getWhatsappUrl = (number, name) => {
  const digits = String(number || '').replace(/\D/g, '')
  const normalized = digits.startsWith('55') ? digits : `${digits.length >= 10 ? '55' : ''}${digits}`
  if (!/^55\d{10,11}$/.test(normalized)) return ''
  const message = encodeURIComponent(`Olá, encontrei o contato de ${name} no site da Atual Pet e gostaria de informações sobre os produtos.`)
  return `https://wa.me/${normalized}?text=${message}`
}

export default function Distributors() {
  const [filters,setFilters]=useState({search:'',state:'',region:''})
  const results=useMemo(()=>catalogService.searchDistributors(filters).sort((a,b)=>a.state.localeCompare(b.state)||a.name.localeCompare(b.name)),[filters])
  const states=[...new Set(distributors.map(d=>d.state))].sort()
  const set=(key,value)=>setFilters({...filters,[key]:value})
  return <>
    <Seo title="Onde encontrar" description="Localize distribuidores parceiros que comercializam produtos Atual Pet." path="/onde-encontrar"/>
    <PageHero eyebrow="Distribuidores parceiros" title="Encontre Atual Pet na sua região." text="Os produtos Atual Pet chegam a diferentes regiões por meio de distribuidores parceiros da marca."/>
    <main className={`${styles.page} shell section`}>
      <aside><h2>Refine a busca</h2><label>Nome ou cidade<div><Search size={16}/><input value={filters.search} onChange={e=>set('search',e.target.value)} placeholder="Ex.: São Paulo"/></div></label><label>Estado<select value={filters.state} onChange={e=>set('state',e.target.value)}><option value="">Todos</option>{states.map(s=><option key={s}>{s}</option>)}</select></label><label>Região<select value={filters.region} onChange={e=>set('region',e.target.value)}><option value="">Todas</option><option>Sudeste</option><option>Sul</option><option>Centro-Oeste</option><option>Nordeste</option><option>Norte</option></select></label><button className="text-link" onClick={()=>setFilters({search:'',state:'',region:''})}>Limpar filtros</button></aside>
      <section><p className={styles.count}><strong>{results.length}</strong> distribuidores parceiros encontrados</p>{results.length?<div className={styles.list}>{results.map((item) => {
        const whatsappUrl = item.whatsapp ? getWhatsappUrl(item.whatsapp, item.name) : ''
        return <article key={item.id}><div><span>{item.state} · {item.city}</span><h3>{item.name}</h3>{item.notes&&<p>{item.notes}</p>}</div><div className={styles.cardActions}><span>{item.phone}</span>{whatsappUrl&&<a className="button button--small" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Falar com ${item.name} pelo WhatsApp`}><FaWhatsapp aria-hidden="true"/> <span>Falar pelo WhatsApp</span></a>}</div></article>
      })}</div>:<EmptyState title="Nenhum distribuidor parceiro localizado" text="Tente outra cidade ou remova um dos filtros."/>}</section>
    </main>
    <section className={`${styles.ctas} shell section`}><div><MapPin/><h2>Já é distribuidor parceiro e não aparece?</h2><p>Envie os dados atualizados para análise da equipe Atual Pet.</p><Link className="button button--outline" to="/contato">Solicitar atualização</Link></div><div><h2>Quer distribuir Atual Pet?</h2><p>Conte sobre sua empresa, experiência e região atendida. A candidatura será analisada pela equipe comercial.</p><Link className="button" to="/seja-um-distribuidor">Conhecer a parceria</Link></div></section>
  </>
}
