import { ExternalLink } from 'lucide-react'

const portalUrl = import.meta.env.VITE_PORTAL_COMERCIAL_URL || '#'

export default function PortalCommercialButton({ compact = false }) {
  return <a className={compact ? 'portal-link portal-link--compact' : 'portal-link'} href={portalUrl} target={portalUrl === '#' ? undefined : '_blank'} rel="noreferrer">Portal Comercial <ExternalLink size={14} aria-hidden="true" /></a>
}
