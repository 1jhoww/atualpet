import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as: Tag = 'div', children, className = '', delay = 0, style, ...props }) {
  const elementRef = useRef(null)
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)
  ))

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (visible) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  return <Tag
    ref={elementRef}
    className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
    style={{ ...style, '--reveal-delay': `${delay}ms` }}
    {...props}
  >{children}</Tag>
}
