import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'

const Links=lazy(()=>import('./pages/Links'));const Home=lazy(()=>import('./pages/Home'));const About=lazy(()=>import('./pages/About'));const Products=lazy(()=>import('./pages/Products'));const ProductDetail=lazy(()=>import('./pages/ProductDetail'));const Launches=lazy(()=>import('./pages/Launches'));const AmazonExclusive=lazy(()=>import('./pages/AmazonExclusive'));const BathCalculator=lazy(()=>import('./pages/BathCalculator'));const LinePage=lazy(()=>import('./pages/LinePage'));const Distributors=lazy(()=>import('./pages/Distributors'));const BecomeDistributor=lazy(()=>import('./pages/BecomeDistributor'));const Materials=lazy(()=>import('./pages/Materials'));const Contact=lazy(()=>import('./pages/Contact'));const Privacy=lazy(()=>import('./pages/Privacy'));const Cookies=lazy(()=>import('./pages/Cookies'));const Terms=lazy(()=>import('./pages/Terms'));const NotFound=lazy(()=>import('./pages/NotFound'))

// Rotas sem o layout institucional (landing usada em links externos).
const bareRoutes = new Set(['/links'])

function Loading(){return <main className="route-loading" aria-live="polite"><span/>Carregando conteúdo…</main>}
export default function App(){const bare=bareRoutes.has(useLocation().pathname);return <ErrorBoundary><a className="skip-link" href="#main-content">Ir para o conteúdo</a><ScrollToTop/>{!bare&&<Header/>}<div id="main-content"><Suspense fallback={<Loading/>}><Routes><Route path="/" element={<Home/>}/><Route path="/sobre" element={<About/>}/><Route path="/produtos" element={<Products/>}/><Route path="/produtos/:slug" element={<ProductDetail/>}/><Route path="/lancamentos" element={<Launches/>}/><Route path="/lancamentos/linha-exclusiva-amazon" element={<AmazonExclusive/>}/><Route path="/calculadora-do-banho" element={<BathCalculator/>}/><Route path="/links" element={<Links/>}/><Route path="/linhas/:slug" element={<LinePage/>}/><Route path="/onde-encontrar" element={<Distributors/>}/><Route path="/seja-um-distribuidor" element={<BecomeDistributor/>}/><Route path="/materiais" element={<Materials/>}/><Route path="/contato" element={<Contact/>}/><Route path="/politica-de-privacidade" element={<Privacy/>}/><Route path="/politica-de-cookies" element={<Cookies/>}/><Route path="/termos-de-uso" element={<Terms/>}/><Route path="/404" element={<NotFound/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></div>{!bare&&<Footer/>}</ErrorBoundary>}
