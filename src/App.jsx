import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'

const Home=lazy(()=>import('./pages/Home'));const About=lazy(()=>import('./pages/About'));const Products=lazy(()=>import('./pages/Products'));const ProductDetail=lazy(()=>import('./pages/ProductDetail'));const LinePage=lazy(()=>import('./pages/LinePage'));const Distributors=lazy(()=>import('./pages/Distributors'));const BecomeDistributor=lazy(()=>import('./pages/BecomeDistributor'));const Materials=lazy(()=>import('./pages/Materials'));const Contact=lazy(()=>import('./pages/Contact'));const Privacy=lazy(()=>import('./pages/Privacy'));const NotFound=lazy(()=>import('./pages/NotFound'))

function Loading(){return <main className="route-loading" aria-live="polite"><span/>Carregando conteúdo…</main>}
export default function App(){return <ErrorBoundary><a className="skip-link" href="#main-content">Ir para o conteúdo</a><ScrollToTop/><Header/><div id="main-content"><Suspense fallback={<Loading/>}><Routes><Route path="/" element={<Home/>}/><Route path="/sobre" element={<About/>}/><Route path="/produtos" element={<Products/>}/><Route path="/produtos/:slug" element={<ProductDetail/>}/><Route path="/linhas/:slug" element={<LinePage/>}/><Route path="/onde-encontrar" element={<Distributors/>}/><Route path="/seja-um-distribuidor" element={<BecomeDistributor/>}/><Route path="/materiais" element={<Materials/>}/><Route path="/contato" element={<Contact/>}/><Route path="/politica-de-privacidade" element={<Privacy/>}/><Route path="/404" element={<NotFound/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></div><Footer/></ErrorBoundary>}
