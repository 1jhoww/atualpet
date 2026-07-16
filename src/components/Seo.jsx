import { useEffect } from 'react'

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) { element = document.createElement('meta'); document.head.appendChild(element) }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function Seo({ title, description, path = '', image, jsonLd }) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://atualpet.com.br'
    const fullTitle = title.includes('Atual Pet') ? title : `${title} | Atual Pet`
    const canonical = `${siteUrl}${path}`
    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    if (image) upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = canonical
    const oldScript = document.getElementById('route-json-ld')
    oldScript?.remove()
    if (jsonLd) {
      const script = document.createElement('script'); script.id = 'route-json-ld'; script.type = 'application/ld+json'; script.text = JSON.stringify(jsonLd); document.head.appendChild(script)
    }
  }, [title, description, path, image, jsonLd])
  return null
}
