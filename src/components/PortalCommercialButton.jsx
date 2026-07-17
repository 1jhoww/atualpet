import { ExternalLink } from 'lucide-react'

const portalUrl = import.meta.env.VITE_PORTAL_COMERCIAL_URL?.trim()

export default function PortalCommercialButton({ compact = false }) {
  if (!portalUrl) return null
  return <a className={compact ? 'portal-link portal-link--compact' : 'portal-link'} href={portalUrl} target="_blank" rel="noopener noreferrer">Portal Comercial <ExternalLink size={14} aria-hidden="true" /></a>
}
