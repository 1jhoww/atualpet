import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import Seo from '../components/Seo'
import { lines } from '../data/lines'
import { products } from '../data/products'
import { catalogService } from '../services/catalogService'
import styles from './Products.module.css'

const categories = ['shampoos','condicionadores','mascaras','colonias','finalizadores','cuidados-especiais','aromatizadores','pre-lavagem','outros']
export default function Products(){
  const [params,setParams]=useSearchParams(); const [limit,setLimit]=useState(8); const [mobileOpen,setMobileOpen]=useState(false)
  const filters={search:params.get('busca')||'',launch:params.get('lancamento')==='true',line:params.get('linha')||'',category:params.get('categoria')||'',fragrance:params.get('fragrancia')||'',volume:params.get('volume')||'',dilution:params.get('diluicao')||''}
  const set=(key,value)=>{const next=new URLSearchParams(params); const queryKey={search:'busca',launch:'lancamento',line:'linha',category:'categoria',fragrance:'fragrancia',volume:'volume',dilution:'diluicao'}[key]; value?next.set(queryKey,value):next.delete(queryKey);setParams(next);setLimit(8)}
  let results=catalogService.searchProducts(filters);const sort=params.get('ordem')||'relevancia';if(sort==='az')results=[...results].sort((a,b)=>a.name.localeCompare(b.name));if(sort==='linha')results=[...results].sort((a,b)=>a.line.localeCompare(b.line)||a.order-b.order)
  const unique=(field)=>[...new Set(products.flatMap(p=>Array.isArray(p[field])?p[field]:p[field]).filter(Boolean))].sort()
  const select=(label,key,options)=><label>{label}<select value={filters[key]} onChange={e=>set(key,e.target.value)}><option value="">Todos</option>{options.map(option=><option key={option} value={option}>{option.replaceAll('-',' ')}</option>)}</select></label>
  return <><Seo title="Catálogo de produtos" description="Explore o catálogo público Atual Pet por linha, categoria, fragrância, volume e diluição." path="/produtos"/><PageHero eyebrow="Catálogo profissional" title="Encontre o produto certo para cada etapa." text="Consulte linhas, categorias e apresentações. O catálogo não exibe preços nem realiza vendas online."/>
    <main className={`${styles.catalog} shell section`}><button className={styles.filterToggle} onClick={()=>setMobileOpen(true)}><SlidersHorizontal size={18}/> Filtros</button>
      <aside className={`${styles.filters} ${mobileOpen?styles.open:''}`}><div className={styles.filterTop}><h2>Filtros</h2><button onClick={()=>setMobileOpen(false)}>Fechar</button></div><label className={styles.search}>Buscar<Search size={17}/><input value={filters.search} onChange={e=>set('search',e.target.value)} placeholder="Nome, benefício, fragrância"/></label><label>Lançamentos<select value={filters.launch?'true':''} onChange={e=>set('launch',e.target.value)}><option value="">Todos</option><option value="true">Somente lançamentos</option></select></label>{select('Linha','line',lines.map(l=>l.slug))}{select('Categoria','category',categories)}{select('Fragrância','fragrance',unique('fragrance'))}{select('Volume','volume',unique('volumes'))}{select('Diluição','dilution',unique('dilution'))}<button className="text-link" onClick={()=>{setParams({});setMobileOpen(false)}}><RotateCcw size={15}/> Limpar filtros</button></aside>
      <section className={styles.results}><div className={styles.resultTop}><p><strong>{results.length}</strong> {results.length===1?'produto encontrado':'produtos encontrados'}</p><label>Ordenar por<select value={params.get('ordem')||'relevancia'} onChange={e=>{const next=new URLSearchParams(params);next.set('ordem',e.target.value);setParams(next)}}><option value="relevancia">Relevância</option><option value="az">Nome A–Z</option><option value="linha">Linha</option></select></label></div>{results.length?<><div className="product-grid product-grid--catalog">{results.slice(0,limit).map(product=><ProductCard key={product.id} product={product}/>)}</div>{limit<results.length&&<div className="section-action"><button className="button button--outline" onClick={()=>setLimit(limit+8)}>Carregar mais</button></div>}</>:<EmptyState/>}</section>
    </main></>
}
