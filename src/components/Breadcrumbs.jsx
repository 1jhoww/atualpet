import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Breadcrumbs({ items }) { return <nav className="breadcrumbs" aria-label="Breadcrumbs"><Link to="/">Início</Link>{items.map((item) => <span key={item.label}><ChevronRight size={13}/>{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav> }
