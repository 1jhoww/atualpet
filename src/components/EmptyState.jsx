import { PackageOpen } from 'lucide-react'
export default function EmptyState({ title = 'Nenhum resultado encontrado', text = 'Revise os filtros e tente novamente.' }) { return <div className="empty-state"><PackageOpen size={34}/><h3>{title}</h3><p>{text}</p></div> }
